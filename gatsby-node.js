const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');
const webpackLodashPlugin = require('lodash-webpack-plugin');
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
    createNodeField({
      node,
      name: 'slug',
      value: `${date.replace(/\-/g, '/')}${name}`
    })
    createNodeField({
      node,
      name: 'date',
      value: date
    })
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
  const pageTemplate = path.resolve('./src/templates/Post.js');
  const categoryTemplate = path.resolve('./src/templates/Category.js');
  const tagTemplate = path.resolve('./src/templates/Tag.js');
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
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
    const posts = result.data.allMarkdownRemark.edges;
    posts.forEach(({ node }) => {
      const { fields: { slug } } = node
      console.log(slug)
      createPage({
        path: `posts/${slug}`,
        component: pageTemplate,
        context: {
          slug
        }
      });
    });

    // Tags
    // let tags = [];
    // _.each(posts, edge => {
    //   if (_.get(edge, 'node.frontmatter.tags')) {
    //     tags = tags.concat(edge.node.frontmatter.tags);
    //   }
    // });
    // tags = _.uniq(tags);
    // tags.forEach(tag => {
    //   createPage({
    //     path: `tags/${_.kebabCase(tag)}/`,
    //     component: tagTemplate,
    //     tag,
    //     context: {
    //       tag,
    //     },
    //   });
    // });

    // Categories
    // let categories = [];
    // _.each(posts, edge => {
    //   if (_.get(edge, 'node.frontmatter.categories')) {
    //     categories = categories.concat(edge.node.frontmatter.categories)
    //   }
    // });
    // categories = _.uniq(categories);
    // categories.forEach(category => {
    //   createPage({
    //     path: `/categories/${_.kebabCase(category)}/`,
    //     component: categoryTemplate,
    //     category,
    //     context: {
    //       category,
    //     },
    //   });
    // });
  });
};


exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat(['syntax-dynamic-import', 'dynamic-import-webpack'])
  }
};
