const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const createPaginatedPages = require('gatsby-paginate');

const _ = require('lodash');
const moment = require('moment');

const postNodes = [];

const addSiblingNodes = (createNodeField) => {
  postNodes.sort(
    ({frontmatter: {created: d1}}, {frontmatter: {created: d2}}) =>
      moment(d2, 'YYYY-MM-DD HH:mm') - moment(d1, 'YYYY-MM-DD HH:mm')
  );
  const totalPosts = postNodes.length;
  for (let i=0; i<totalPosts; i++) {
    const nxtId = (i + 1) < totalPosts ? i + 1 : 0;
    const prevId = (i - 1) > 0 ? i - 1 : totalPosts - 1;
    const node = postNodes[i];
    const nxtNode = postNodes[nxtId];
    const prevNode = postNodes[prevId];
    createNodeField({
      node,
      name: 'next',
      value: i === totalPosts-1 ? null: {
        title: nxtNode.frontmatter.title,
        slug: nxtNode.fields.slug,
      },
    });
    createNodeField({
      node,
      name: 'prev',
      value: i ===0 ? null : {
        title: prevNode.frontmatter.title,
        slug: prevNode.fields.slug,
      },
    });
  }
};

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators,
}) => {
  const {createNodeField} = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages',
    });
    const separatorIndex = ~slug.indexOf('_') ? slug.indexOf('_') + 1 : 0;
    const name = `
      ${separatorIndex ? '/' : ''}${slug.substring(separatorIndex)}
    `;
    const date = separatorIndex ? slug.substring(1, separatorIndex-1) : '';

    // create path field
    createNodeField({
      node,
      name: 'slug',
      value: `${date.replace(/\-/g, '/').trim()}${name.trim()}`,
    });

    // create id field
    createNodeField({
      node,
      name: 'id',
      value: [`${date.replace(/\-/g, '/')}${name}`],
    });

    // create date field
    createNodeField({
      node,
      name: 'date',
      value: date,
    });

    // create Tag paths field
    const tagPaths = (node.frontmatter.tags || [])
      .map((tag) => ({
        name: tag,
        path: `/tag/${_.kebabCase(tag)}`,
      })
    );

    createNodeField({
      node,
      name: 'tagPaths',
      value: tagPaths,
    });

    // create Categories path field
    const categoryPath = {
      name: node.frontmatter.category,
      path: `/category/${_.kebabCase(node.frontmatter.category)}`,
    };

    createNodeField({
      node,
      name: 'categoryPath',
      value: categoryPath,
    });

    // add to a list to add prev & next to each post
    postNodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({type, boundActionCreators}) => {
  const {name} = type;
  const {createNodeField} = boundActionCreators;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
};

exports.createPages = ({
  graphql,
  boundActionCreators,
}) => {
  const {createPage} = boundActionCreators;
  const indexPage = path.resolve('./src/templates/index.js');
  const pageTemplate = path.resolve('./src/templates/post.js');
  const categoryTemplate = path.resolve('./src/templates/category.js');
  const tagTemplate = path.resolve('./src/templates/tag.js');
  return graphql(
    `
      {
        allMarkdownRemark(sort:{fields:frontmatter___created, order: DESC}) {
          edges {
            node {
              id
              excerpt
              timeToRead
              frontmatter {
                created
                title
                category
                tags
                cover {
                  publicURL
                  childImageSharp {
                    sizes {
                      base64
                      aspectRatio
                      src
                      srcSet
                      sizes
                    }
                  }
                }
              }
              fields {
                tagPaths {
                  name
                  path
                }
                categoryPath {
                  name
                  path
                }
                slug
                date
              }
            }
          }
        }
      }
    `
  ).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const edges = result.data.allMarkdownRemark.edges;
    // Home Page
    createPaginatedPages({
      edges,
      createPage,
      pageTemplate: indexPage,
      pageLength: 10,
      context: { },
    });

    // Post Page
    edges.forEach(({node}) => {
      const {fields: {slug}} = node;
      createPage({
        path: `posts/${slug}`,
        component: pageTemplate,
        context: {
          slug,
        },
      });
    });

    const categories = {};
    const tags = {};

    edges.forEach((edge) => {
      const {category, tags: t = []} = edge.node.frontmatter;
      const catId = _.kebabCase(category);
      if (!categories[catId]) {
        categories[catId] = {
          posts: [],
        };
      }
      categories[catId].posts.push(edge.node);
      t.forEach((t1) => {
        const tagId = _.kebabCase(t1);
        if (!tags[tagId]) {
          tags[tagId] = {
            posts: [],
          };
        }
        tags[tagId].posts.push(edge.node);
      });
    });

    // Category Page
    Object.keys(categories).forEach((c) => {
      const posts = categories[c].posts;
      createPaginatedPages({
        edges: posts,
        createPage,
        pageTemplate: categoryTemplate,
        pageLength: 10,
        pathPrefix: `category/${c}`,
        buildPath: (
          index,
          pathPrefix
        ) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`,
        context: {category: c},
      });
    });

    // Tag Page
    Object.keys(tags).forEach((t) => {
      const posts = tags[t].posts;
      createPaginatedPages({
        edges: posts,
        createPage,
        pageTemplate: tagTemplate,
        pageLength: 10,
        pathPrefix: `tag/${t}`,
        buildPath: (
          index,
          pathPrefix
        ) => index > 1 ? `${pathPrefix}/${index}` : `/${pathPrefix}`,
        context: {tag: t},
      });
    });
  });
};

exports.modifyBabelrc = ({babelrc}) => {
  return {
    ...babelrc,
    plugins: babelrc
      .plugins.concat(['syntax-dynamic-import', 'dynamic-import-webpack']),
  };
};

exports.onCreateWebpackConfig = ({
  stage,
  plugins,
  actions,
}) => {
  const isDevelopment = stage === 'develop' || state === 'develop-html';
  if (isDevelopment) {
    actions.setWebpackConfig({
      // module: {
      //   rules: [
      //     {
      //       enforce: 'pre',
      //       test: /\.js/,
      //       exclude: /node_modules/,
      //       loader: 'eslint-loader'
      //     },
      //   ],
      // },
      plugins: [
        plugins.define({
          __DEVELOPMENT__: stage === `develop` || stage === `develop-html`,
        }),
      ],
    });
  }
};
