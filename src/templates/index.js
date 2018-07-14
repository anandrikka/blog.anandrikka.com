import React from 'react';
import Link from 'gatsby-link';
import injectSheet from 'react-jss';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardMedia';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import Img from 'gatsby-image';

import NavButton from '../components/NavButton'
import PostCard from '../components/PostCard';

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
  navButtons: {
    margin: theme.spacing.unit,
    '&.next': {
      alignSelf: 'flex-end'
    }
  },
  navButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});

const IndexPage = ({ classes, history, pathContext }) => {
  const { nodes, page, pages, total, prev, next } = pathContext;
  console.log(history)
  const gotoPost = (url) => {
    history.push(`/posts/${url}`)
  }
  const loadPage = (url) => {
    history.push(url)
  }
  return (
    <div className={classes.root}>
      {
        nodes.map((item, index) => {
          const postData = item.node;
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
                <PostCard
                  post={postData}
                />
              </CardContent>
            </Card>
          )
        })
      }
      <div className={classes.navButtonsContainer}>
        { prev &&
          <NavButton
            path={prev}
            Icon={NavigateBefore}
            label={'Prev'}
            onClick={loadPage}
          />
        }
        { next &&
          <NavButton
            path={next}
            Icon={NavigateNext}
            label={'Next'}
            onClick={loadPage}
          />
        }
      </div>
    </div>
  );
};

export default injectSheet(styles)(IndexPage);