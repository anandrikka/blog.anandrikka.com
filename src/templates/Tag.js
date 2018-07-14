import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({

});

class TagTemplate extends React.Component {
  render() {
    return (
      <div>Tags</div>
    );
  }
}

TagTemplate.propTypes = {
  data: PropTypes.object,
};

export default injectSheet(styles)(TagTemplate)

export const query = graphql`
  query TagsQuery($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: {eq: $tag } }}
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

