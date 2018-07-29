import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

import SearchInput from '../components/SearchInput';

const styles = (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  display1: {
    fontSize: '1rem',
    fontFamily: 'Montserrat',
  },
});

class Categories extends React.Component {
  render() {
    const data = this.props.data.allMarkdownRemark.group;
    const {classes} = this.props;
    const dateCreated = moment(post.created, 'YYYY-MM-DD HH: mm')
      .format('D MMMM YYYY');
    return (
      <div className={classes.wrapper}>
        <SearchInput
          placeholder="Search Categories"
        />
        <div>
          {
            data.map((category, i) => {
              const posts = category.edges.map((edge) => {
                const frontmatter = edge.node.frontmatter;
                return {
                  ...frontmatter,
                };
              });
              return (
                <div key={`category_${category.name}`}>
                  <Typography
                    variant="title"
                    component="p"
                    classes={{
                      display1: classes.display1,
                    }}
                  >
                    {category.name} ({posts.length})
                  </Typography>
                  <ol>
                    {
                      posts.map((post, j) => (
                        <li key={`post${j}_in_${category.name}`}>
                          <Typography
                            variant="display1"
                            component="p"
                            classes={{
                              display1: classes.display1,
                            }}
                          >
                            {post.title} - {dateCreated}
                          </Typography>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  data: PropTypes.object,
  classes: PropTypes.object,
};

export default injectSheet(styles)(Categories);

export const categories = graphql`
  query postsByCategory {
    allMarkdownRemark {
      group(field: frontmatter___category) {
        name: fieldValue
        edges {
          node {
            frontmatter {
              title
              created
              tags
            }
          }
        }
      }
    }
  }
`;
