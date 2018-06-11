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
    const separatorIndex = ~slug.indexOf('#') ? slug.indexOf('#') + 1 : 0;
    createNodeField({
      node,
      name: 'slug',
      value: `${separatorIndex ? '/' : ''}${slug.substring(separatorIndex)}`
    })
    createNodeField({
      node,
      name: 'date',
      value: separatorIndex ? slug.substring(1, separatorIndex-1) : ''
    })
  }
};

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
              id
              fields {
                slug
                date
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

    // Tags
    let tags = [];
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.tags')) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    tags = _.uniq(tags);
    tags.forEach(tag => {
      createPage({
        path: `tags/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        tag,
        context: {
          tag,
        },
      });
    });

    // Categories
    let categories = [];
    _.each(posts, edge => {
      if (_.get(edge, 'node.frontmatter.categories')) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    });
    categories = _.uniq(categories);
    categories.forEach(category => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: categoryTemplate,
        category,
        context: {
          category,
        },
      });
    });
  });
};


exports.modifyBabelrc = ({ babelrc }) => {
  return {
    ...babelrc,
    plugins: babelrc.plugins.concat(['syntax-dynamic-import', 'dynamic-import-webpack'])
  }
};
