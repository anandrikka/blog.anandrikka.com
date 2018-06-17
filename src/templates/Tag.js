// import React from 'react';
// import PropTypes from 'prop-types';

// export default function TagTemplate({ data }) {
//   console.log('Tags: ', data);
//   return (
//     <div>Tags</div>
//   )
// }

// TagTemplate.propTypes = {
//   data: PropTypes.object,
// };

// export const query = graphql`
//   query TagsQuery($tag: String!) {
//     allMarkdownRemark(
//       filter: { frontmatter: { tags: {eq: $tag } }}
//       sort: { fields: [fields___date], order: DESC }
//     ) {
//       edges {
//         node {
//           excerpt
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `;

