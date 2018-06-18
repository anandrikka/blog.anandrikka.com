const config = require('./src/content/config/metadata');

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const regexExcludeRobots = /^(?!\/(dev-404-page|404|offline-plugin-app-shell-fallback|tags|categories)).*$/

module.exports = {
  siteMetadata: {
    ...config.siteMetadata,
    rssMetadata: {
      site_url: config.siteMetadata.url + config.prefixPath,
      feed_url: config.siteMetadata.url + config.prefixPath + '/rss.xml',
      title: config.siteMetadata.title,
      description: config.siteMetadata.description
    }
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content/posts/`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/assets/img/`,
        name: 'images'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-component',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1200,
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {}
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 2em'
            }
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-plugin-sharp',
          // 'gatsby-remark-autolink-headers', // Provides autolink for all the headers
        ]
      }
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#c62828"
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GATSBY_GA_TRACKING_ID
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        query: `
        {
          site {
            siteMetadata {
              url
            }
          }
          allSitePage(filter: { path: { regex: "${regexExcludeRobots}" } }) {
            edges {
              node {
                path
              }
            }
          }
        }
      `
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        // setup(ref) {
        //   const result = ref.query.site.siteMetadata.rssMetadata;
        //   result.allMarkdownRemark = ref.query.allMarkdownRemark;
        //   result.generator = "Anand Rikka Blog";
        //   return result;
        // },
        query: `
        {
          site {
            siteMetadata {
              rssMetadata {
                site_url
                feed_url
                title
                description
              }
            }
          }
        }
      `,
        feeds: [
          {
            serialize(ctx) {
              const { rssMetadata } = ctx.query.site.siteMetadata;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                categories: edge.node.frontmatter.tags,
                date: edge.node.frontmatter.created,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: rssMetadata.author,
                url: rssMetadata.site_url + edge.node.fields.slug,
                guid: rssMetadata.site_url + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }]
              }));
            } ,
            query: `
            allMarkdownRemark(limit: 1000, sort: { order: DESC, fields: [frontmatter___date] }) {
              edges {
                node {
                  excerpt
                  html
                  timeToRead
                  fields { slug }
                  frontmatter {
                    title
                    cover
                    created
                    tags
                  }
                }
              }
            }
            `,
            output: '/rss.xml'
          }
        ]
      }
    }
  ],
};
