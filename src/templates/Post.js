import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '@material-ui/core/Typography';
import rehypeReact from 'rehype-react';
// import AppLink from '../components/Link';
import moment from 'moment';
import DisqusComments from '../components/Disqus';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // 'app-link': AppLink
  }
}).Compiler;

const styles = theme => ({
  article: {
    boxSizing: 'border-box',
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.common.white,
    padding: 20,
    ['@media screen and (max-width: 600px)']: {
      padding: 15
    },
    '& header': {
      textAlign: 'center'
    }
  },
  pageContent: {

  }
});

const PostTemplate = ({ data, classes }) => {
  console.log('Data: ', data)
  const {
    markdownRemark: {
      htmlAst,
      wordCount: {
        words
      },
      timeToRead,
      frontmatter: {
        title,
        created,
        identifier
      },
      fields: {
        slug
      }
    },
  } = data;
  console.log(identifier)
  return (
    <article className={classes.article}>
      <div className={classes.pageContent}>
        <header>
          <Typography variant="display1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="caption">
            {moment(created, 'YYYY-MM-DD HH:mm').format('Do MMMM YYYY')}
          </Typography>
        </header>
        {renderAst(htmlAst)}
        {/*<div dangerouslySetInnerHTML={{__html: html}} />*/}
        <p>Total Words: {words}</p>
        <p>Time to Read: {timeToRead}</p>
      </div>
      <DisqusComments
        identifier={identifier}
        title={title}
        url={slug}
        categoryId={'test'}
      />
    </article>
  );
}

PostTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.any,
      wordCount: PropTypes.shape({
        words: PropTypes.number,
      }),
      timeToRead: PropTypes.number,
      frontmatter: PropTypes.shape({
        title: PropTypes.string
      })
    })
  })
};

export default injectSheet(styles)(PostTemplate);

export const postQuery = graphql`
  query PostByPath($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			htmlAst
			wordCount {
				words
			}
			timeToRead
			frontmatter {
        title
        created
        identifier
      }
      fields {
        slug
      }
		}
	}
`;
