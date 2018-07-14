const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPaginationPages } = require('gatsby-pagination');
const _ = require('lodash');
const moment = require('moment');

const post_nodes = [];

const addSiblingNodes = (createNodeField) => {
  post_nodes.sort(
    ({ frontmatter: { created: d1 } }, { frontmatter: { created: d2 } }) =>
      moment(d2, 'YYYY-MM-DD HH:mm') - moment(d1, 'YYYY-MM-DD HH:mm')
  );
  const totalPosts = post_nodes.length;
  for(let i=0; i<totalPosts; i++) {
    const nxtId = (i + 1) < totalPosts ? i + 1 : 0;
    const prevId = (i - 1) > 0 ? i - 1 : totalPosts - 1;
    const node = post_nodes[i];
    const nxtNode = post_nodes[nxtId];
    const prevNode = post_nodes[prevId];
    createNodeField({
      node,
      name: 'next',
      value: i === totalPosts-1 ? null: {
        title: nxtNode.frontmatter.title,
        slug: nxtNode.fields.slug
      }
    });
    createNodeField({
      node,
      name: 'prev',
      value: i ===0 ? null :{
        title: prevNode.frontmatter.title,
        slug: prevNode.fields.slug
      }
    })
  }
}

exports.onCreateNode = ({
  node,
  getNode,
  boundActionCreators,
}) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'pages'
    });
    const separatorIndex = ~slug.indexOf('_') ? slug.indexOf('_') + 1 : 0;
    const name = `${separatorIndex ? '/' : ''}${slug.substring(separatorIndex)}`
    const date = separatorIndex ? slug.substring(1, separatorIndex-1) : ''

    // create path field
    createNodeField({
      node,
      name: 'slug',
      value: `${date.replace(/\-/g, '/')}${name}`
    })

    // create id field
    createNodeField({
      node,
      name: 'id',
      value: [`${date.replace(/\-/g, '/')}${name}`]
    })

    // create date field
    createNodeField({
      node,
      name: 'date',
      value: date
    })

    // create Tag paths field
    const tagPaths = (node.frontmatter.tags || []).map(tag => `/tags/${_.kebabCase(tag)}`)
    createNodeField({
      node,
      name: 'tagPaths',
      value:tagPaths
    })

    // create Categories path field
    const categoryPath = `/categories/${_.kebabCase(node.frontmatter.category)}`
    createNodeField({
      node,
      name: 'categoryPath',
      value: categoryPath
    })

    // add to a list to add prev & next to each post
    post_nodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, boundActionCreators }) => {
  const { name } = type;
  const { createNodeField } = boundActionCreators;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField)
  }
}

exports.createPages = ({
  graphql,
  boundActionCreators,
}) => {
  const { createPage } = boundActionCreators;
  const indexPage = path.resolve('./src/templates/index.js');
  const pageTemplate = path.resolve('./src/templates/Post.js');
  const categoryTemplate = path.resolve('./src/templates/Category.js');
  const tagTemplate = path.resolve('./src/templates/Tag.js');
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              id
              excerpt
              timeToRead
              frontmatter {
                created
                title
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
                tagPaths
                categoryPath
                slug,
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

    createPaginationPages({
      edges,
      createPage,
      component: indexPage,
      limit: 3
    });

    // Create Post page
    edges.forEach(({ node }) => {
      const { fields: { slug } } = node;
      createPage({
        path: `posts/${slug}`,
        component: pageTemplate,
        context: {
          slug
        }
      });
    });

    // Extract Tags & Categories
    let zTags = [];
    let zCategories = [];
    _.each(edges, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        zTags = zTags.concat(edge.node.frontmatter.tags);
      }
      if (_.get(edge, 'node.frontmatter.category')) {
        zCategories = zCategories.push(edge.node.frontmatter.category)
      }
    });
    zTags = _.uniq(zTags);
    zCategories = _.uniq(zCategories);

    // Create Tag page
    zTags.forEach(tag => {
      createPage({
        path: `tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      });
    });

    zCategories.forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: categoryTemplate,
        context: {
          category,
        },
      });
    });

    // Create Category page



    // const categories = {};
    //
    // edges.forEach(({ node}) => {
    //   const { categories: c = [], tags = [] } = node.frontmatter;
    //   const id = node.fields.slug;
    //   c.forEach((item) => {
    //     if (!categories[item]) {
    //       categories[item] = {
    //         posts: [],
    //         tags: []
    //       }
    //     }
    //     const thisCategory = categories[item]
    //     thisCategory.posts.push(id)
    //     if (tags) {
    //       tags.forEach((tag) => {
    //         if (tag) {
    //           if (!thisCategory.tags[tag]) {
    //             thisCategory.tags[tag] = []
    //           }
    //           thisCategory.tags[tag].push(id)
    //         }
    //       })
    //     }
    //   })
    // })
    //
    // Object.keys(categories).forEach((category) => {
    //   const postIds = categories[category].posts
    //   createPaginationPages({
    //     createPage,
    //     pathFrontmatter: path => `/${_.kebabCase(category)}/${path !== 1 ? '/' + path : '/'}`,
    //     component: categoryTemplate,
    //     limit: 1,
    //     edges: postIds,
    //     context: { category }
    //   })
    //
    //   let allTags = [];
    //   // For each of the tags in the post object, create a tag page.
    //   Object.keys(categories[category].tags).forEach((tag) => {
    //     allTags.push(tag);
    //     const postIds = categories[category].tags[tag];
    //     createPaginationPages({
    //       createPage,
    //       pathFormatter: path => `/${_.kebabCase(category)}/tags/${_.kebabCase(tag)}${path !== 1 ? '/' + path : '/'}`,
    //       component: tagTemplate,
    //       limit: 10,
    //       edges: postIds,
    //       context: {
    //         category,
    //         tag
    //       }
    //     });
    //   })
    // });
  });
};


exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat(['syntax-dynamic-import', 'dynamic-import-webpack'])
  }
};
