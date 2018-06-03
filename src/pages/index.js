import React from 'react';
import Link from 'gatsby-link';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;
  console.log(posts)
  return (
    <div>
      {posts.map((post) => {
        return <Link to={post.node.fields.slug} key={post.id}>{post.node.frontmatter.title}</Link>
      })}
    </div>
  );
};

export default IndexPage

export const allPosts = graphql`
  query allPosts {
    allMarkdownRemark {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            title
            categories
            tags
            parent
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
