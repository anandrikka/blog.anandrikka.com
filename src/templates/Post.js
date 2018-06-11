import React from 'react';
import PropTypes from 'prop-types';

import rehypeReact from 'rehype-react';
// import { CodeTabs, CodeTab } from '../components/CodeTabs';

// const renderAst = new rehypeReact({
//   createElement: React.createElement,
//   components: {
//     'app-code-tabs': CodeTabs,
//     'app-code-tab': CodeTab,
//   }
// }).Compiler;
// {renderAst(htmlAst)}

export default function PostTemplate({ data }) {
  const {
    markdownRemark: {
      html,
      wordCount: { words },
      timeToRead,
      frontmatter: { title, categories, tags },
    },
  } = data;
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: html}} />
      {categories.map((c, index) => (
        <span key={`post_category_${index}`}>{c}</span>
      ))}
      {tags.map((c, index) => (
        <span key={`post_category_${index}`}>{c}</span>
      ))}
      <p>Total Words: {words}</p>
      <p>Time to Read: {timeToRead}</p>
    </div>
  );
}

PostTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.any,
      wordCount: PropTypes.shape({
        words: PropTypes.number,
      }),
      timeToRead: PropTypes.number,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        categories: PropTypes.array,
        tags: PropTypes.array,
      })
    })
  })
};

export const postQuery = graphql`
  query PostByPath($path: String!) {
		markdownRemark(fields: { slug: { eq: $path } }) {
			html
			wordCount {
				words
			}
			timeToRead
			frontmatter {
				title
				categories
				tags
			}
		}
	}
`;
