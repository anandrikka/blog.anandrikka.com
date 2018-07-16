import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import Typography from '@material-ui/core/Typography'
import moment from 'moment';

const styles = theme => ({
	title: {
    color: 'rgba(0, 0, 0, 0.75)'
  },
});

const PostCardContent = ({ classes, post }) => (
	<React.Fragment>
		<Typography
			variant="headline"
			component="h5"
			gutterBottom
			classes={{
				root: classes.title
			}}
		>
			{post.frontmatter.title}
		</Typography>
		<Typography variant="caption" gutterBottom>
			{moment(post.fields.date, 'YYYY-MM-DD').format('Do MMMM YYYY')} - {post.timeToRead} min read
		</Typography>
		<Typography varient="body2">{post.excerpt}</Typography>
	</React.Fragment>
);

PostCardContent.propTypes = {
	classes: PropTypes.object,
	post: PropTypes.shape({
		frontmatter: PropTypes.object,
		fields: PropTypes.object,
		timeToRead: PropTypes.number,
		excerpt: PropTypes.string
	})
};

export default injectSheet(styles)(PostCardContent)
