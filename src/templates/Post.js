import React, { Component } from 'react';

class PageTemplate extends Component {
  render() {
    const {
      markdownRemark: {
        html,
        wordCount: { words },
        timeToRead,
        frontmatter: { title, categories, tags },
      },
    } = this.props.data;
    return (
      <div>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
}

export default PageTemplate;

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

