import React from 'react';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardMedia';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import javascriptPng from '../assets/img/javascript.png';

const styles = theme => ({
  indexRoot: {
    flexGrow: 1,
  },
  blogSummary: {
    display: 'flex',
    flexDirection: 'row-reverse',
    cursor: 'pointer'
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  cover: {
    minWidth: 60,
    height: 60,
    margin: 8,
    [`${theme.breakpoints.down('sm')}`]: {
      minWidth: 50,
      height: 50
    },
    [`${theme.breakpoints.between('sm, md')}`]: {
      minWidth: 60,
      height: 60
    },
    [`${theme.breakpoints.up('md')}`]: {
      minWidth: 75,
      height: 75
    }
  }
});

const IndexPage = ({ data, classes, ...props }) => {
  const posts = data.posts.edges;
  return (
    <div className={classes.indexRoot}>
      {posts.map((post, index) => (
        <Grid container spacing={16} key={`posts_${index}`}>
          <Grid item xs={12}>
            <Card
              elevation={0}
              className={classes.blogSummary}
              raised={false}
            >
              <div className={classes.details}>
                <CardContent>
                  <Typography variant="headline" component="h5" gutterBottom>{post.node.frontmatter.title}</Typography>
                  <Typography variant="caption" gutterBottom>{post.node.frontmatter.date}</Typography>
                  <Typography component="p">{post.node.excerpt}</Typography>
                </CardContent>
              </div>
              <CardMedia
                image={javascriptPng}
                className={classes.cover}
              />
            </Card>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default injectSheet(styles)(IndexPage);

export const allPosts = graphql`
  query allPosts {
    posts: allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          excerpt
          timeToRead
          frontmatter {
            date
            title
            categories
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
