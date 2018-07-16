import React from 'react';
import injectSheet from 'react-jss';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Img from 'gatsby-image';

import PostCardContent from './PostCardConent';

const styles = theme => ({
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
});

const PostCard = ({ classes, postData, gotoPost }) => (
	<Card
		elevation={1}
		classes={{
			root: classes.post
		}}
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
			<PostCardContent post={postData} />
		</CardContent>
	</Card>
)

export default injectSheet(styles)(PostCard);
