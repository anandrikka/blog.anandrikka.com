import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import rehypeReact from 'rehype-react';
import moment from 'moment';

import SocialShare from '../components/SocialShare';
import DisqusComments from '../components/Disqus';
import Seo from '../components/Seo';
// import AppLink from '../components/Link';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    // 'app-link': AppLink
  }
}).Compiler;

const styles = theme => ({
  article: {
    boxSizing: 'border-box',
    //boxShadow: theme.shadows[1],
    //backgroundColor: theme.palette.common.white,
    padding: 20,
    ['@media screen and (max-width: 600px)']: {
      padding: 15
    }
  },
  pageContent: {

  },
  button: {
    margin: theme.spacing.unit,
  },
  secondaryTitle: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  subheader: {
    fontSize: '0.75rem'
  }
});

const PostTemplate = ({ data, classes, history }) => {
  const onTagSelect = (tag) => {
    history.push(`/tags/${tag}`);
  }
  const {
    markdownRemark: {
      excerpt,
      htmlAst,
      timeToRead,
      frontmatter: {
        title,
        created,
        identifier,
        cover: {
          publicURL
        },
        description,
        tags,
        category
      },
      fields: {
        slug
      }
    },
  } = data;
  const seoData = {
    title,
    slug,
    cover: publicURL,
    excerpt,
    description,
    tags,
    category
  }
  return (
    <article className={classes.article}>
      <Seo node={seoData} post />
      <div className={classes.pageContent}>
        <header>
          <Typography variant="display1" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="caption" align="center" gutterBottom>
            {moment(created, 'YYYY-MM-DD HH:mm').format('Do MMMM YYYY')} - {`${timeToRead} min Read`}
          </Typography>
          <Typography variant="caption" align="center">
            <i className="fa fa-bookmark" style={{padding: '0 10px'}}></i>{category}
          </Typography>
        </header>
        {renderAst(htmlAst)}
        {/*<div dangerouslySetInnerHTML={{__html: html}} />*/}
      </div>
      <div>
        {
          tags.map((tag, index) => (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className={classes.button}
              onClick={onTagSelect}
              key={`tag_${index}`}
            >
              {`#${tag}`}
            </Button>
          ))
        }
      </div>
      <SocialShare
        node={data.markdownRemark}
        path={slug}
      />
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
      excerpt
			htmlAst
			wordCount {
				words
			}
			timeToRead
			frontmatter {
        title
        created
        identifier
        cover {
          publicURL
        }
        tags
        category
      }
      fields {
        slug
      }
		}
	}
`;
