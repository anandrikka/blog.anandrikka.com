const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const _ = require('lodash');

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
    const separatorIndex = ~slug.indexOf('$') ? slug.indexOf('$') + 1 : 0;
    createNodeField({
      node,
      name: 'slug',
      value: `${separatorIndex ? '/' : ''}${slug.substring(separatorIndex)}`
    })
    createNodeField({
      node,
      name: 'prefix',
      value: separatorIndex ? slug.substring(1, separatorIndex-1) : ''
    })
  }
};

exports.createPages = ({
  graphql,
  boundActionCreators,
}) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve("./src/templates/Post.js");
  return graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              id
              fields {
                slug
                prefix
              }
              html
              children {
                id
              }
              timeToRead
              wordCount {
                paragraphs
                sentences
                words
              }
              frontmatter {
                title
                categories
                tags
                parent
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
      createPage({
        path: node.fields.slug,
        component: pageTemplate,
      });
    });
  })
};
