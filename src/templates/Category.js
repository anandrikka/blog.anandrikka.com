import React from 'react';
import PropTypes from 'prop-types';

export default function CategoryTemplate(props) {
  return (
    <div>Category</div>
  )
}

CategoryTemplate.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query CategoryQuery($nodes: [String]) {
    allMarkdownRemark(
      filter: { fields: { id: { in: $nodes } } },
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            title
            created
          }
          fields {
            categoryPath
          }
        }
      }
    }
  }
`;

