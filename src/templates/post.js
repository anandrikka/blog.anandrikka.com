import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import rehypeReact from 'rehype-react';
import moment from 'moment';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import SocialShare from '../components/SocialShare';
import DisqusComments from '../components/Disqus';
import Seo from '../components/Seo';
import PostLinks from '../components/PostLinks';

const renderAst = new rehypeReact({ //eslint-disable-line
  createElement: React.createElement,
  components: {
    // 'app-link': AppLink
  },
}).Compiler;

const styles = (theme) => ({
  article: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
    flexDirection: 'column',
    alignItems: 'stretch',
    boxSizing: 'border-box',
    padding: 20,
    ['@media screen and (max-width: 600px)']: {
      padding: 15,
    },
    wordBreak: 'break-word',
  },
  pageContent: {

  },
  button: {
    margin: theme.spacing.unit,
  },
  secondaryTitle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  subheader: {
    fontSize: '0.75rem',
  },
});

const PostTemplate = ({data, classes, history}) => {
  const goto = (url) => {
    history.push(url);
  };
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
          publicURL,
        },
        description,
        tags,
        category,
      },
      fields: {
        slug,
        tagPaths,
        categoryPath,
        prev,
        next,
      },
    },
  } = data;
  const seoData = {
    title,
    slug,
    cover: publicURL,
    excerpt,
    description,
    tags,
    category,
  };
  const formattedDate = moment(created, 'YYYY-MM-DD HH:mm')
    .format('Do MMMM YYYY');
  const timeToReadArticle = `${timeToRead} min`;
  return (
    <article className={classes.article}>
      <Seo node={seoData} post />
      <div className={classes.pageContent}>
        <header>
          <Typography variant="display1" gutterBottom align="center">
            {title}
          </Typography>
          <Typography variant="caption" align="center" gutterBottom>
            {formattedDate} - {timeToReadArticle}
          </Typography>
          <Typography variant="caption" align="center">
            <i
              className="fa fa-bookmark"
              style={{padding: '0 10px'}}
            />
            {categoryPath.name}
          </Typography>
        </header>
        {renderAst(htmlAst)}
        {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
      </div>
      <div>
        {
          tagPaths.map((tag, index) => (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              className={classes.button}
              onClick={() => goto(tag.path)}
              key={`tag_${index}`}
            >
              {`#${tag.name}`}
            </Button>
          ))
        }
      </div>
      <SocialShare
        node={data.markdownRemark}
        path={`posts/${slug}`}
      />
      <PostLinks
        prev={prev}
        next={next}
      />
      <DisqusComments
        identifier={identifier}
        title={title}
        url={slug}
        categoryId={'test'}
      />
    </article>
  );
};

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
        title: PropTypes.string,
      }),
    }),
  }),
  history: PropTypes.object,
};

export default injectSheet(styles)(PostTemplate);

/* eslint-disable */
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
        tagPaths {
          name
          path
        }
        categoryPath {
          name
          path
        }
        next {
          title
          slug,
          url
        }
        prev {
          title
          slug,
          url
        }
      }
		}
	}
`;
