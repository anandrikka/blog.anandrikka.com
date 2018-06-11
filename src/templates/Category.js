import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTemplate({ data }) {
  console.log('Category: ', data);
  return (
    <div>Category</div>
  )
}

CategoryTemplate.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query CategoryQuery($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: {eq: $category } }}
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

