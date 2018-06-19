import React from 'react';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardMedia';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Img from 'gatsby-image';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch'
  },
  post: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: '11em',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translate(0px, -2px)',
      boxShadow: '0 15px 30px -10px rgba(10, 16, 34, .2)'
    },
    ['@media only screen and (max-width: 600px)']: {
      flexDirection: 'column'
    }
  },
  postThumbnail: {
    maxWidth: '100%',
    minHeight: '11em',
    backgroundSize: 'cover',
    backgroundPosition: '50%, 50%',
    backgroundRepeat: 'no-repeat',
    ['@media only screen and (max-width: 600px)']: {
      width: '100%'
    }
  },
  thumbnailOuterWrapper: {
    width: '30%',
    maxWidth: '100%',
    maxHeight: '11em',
    flexGrow: 1,
    ['@media only screen and (max-width: 600px)']: {
      width: '100%'
    }
  },
  thumbnailInnerWrapper: {
    position: 'static !important'
  },
  postContent: {
    width: '70%',
    boxSizing: 'border-box',
    ['@media only screen and (max-width: 600px)']: {
      width: '100%'
    }
  },
  title: {
    color: 'rgba(0, 0, 0, 0.75)'
  }
});

const IndexPage = ({ data, classes, history }) => {
  const posts = data.posts.edges;
  const gotoPost = (url) => {
    history.push(`/posts/${url}`)
  }
  return (
    <div className={classes.root}>
      {
        posts.map((post, index) => {
          const postData = post.node;
          return (
            <Card
              elevation={1}
              classes={{
                root: classes.post
              }}
              key={`posts_${index}`}
              onClick={() => gotoPost(postData.fields.slug)}
            >
              <Img
                sizes={postData.frontmatter.cover.childImageSharp.sizes}
                className={classes.thumbnailInnerWrapper}
                outerWrapperClassName={classes.thumbnailOuterWrapper}
              />
              <CardContent
                classes={{
                  root: classes.postContent
                }}
              >
                <Typography
                  variant="headline"
                  component="h5"
                  gutterBottom
                  classes={{
                    root: classes.title
                  }}
                >
                  {postData.frontmatter.title}
                </Typography>
                <Typography variant="caption" gutterBottom>
                  {new Date(postData.fields.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} - {post.node.timeToRead} min read
                </Typography>
                <Typography varient="body2">{postData.excerpt}</Typography>
              </CardContent>
            </Card>
          )
        })
      }
    </div>
  );
};

export default injectSheet(styles)(IndexPage);

export const allPosts = graphql`
  query allPosts {
    posts: allMarkdownRemark(sort: {fields: [frontmatter___created], order: DESC}) {
      totalCount
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
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
          fields {
            slug,
            date
          }
        }
      }
    }
  }
`;
