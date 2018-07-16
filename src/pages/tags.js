import React from 'react';
import injectSheet from 'react-jss';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { uniq } from 'lodash';

import SearchInput from '../components/SearchInput';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  display1: {
    fontSize: '1rem',
    fontFamily: 'Montserrat'
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Tags extends React.Component {
  onTagSelect = (tag) => {
    this.props.history.push(`/tags/${_.kebabCase(tag)}`)
  }
  render() {
    const data = this.props.data.allMarkdownRemark.group;
    const { classes } = this.props;
    const tags = uniq(data.map(tag => tag.name.toLowerCase()))
    return (
      <div className={classes.wrapper}>
        <SearchInput
          placeholder="Search Tags"
        />
        <div>
          <div>
            {
              tags.map((tag, index) => (
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  className={classes.button}
                  onClick={() => this.onTagSelect(tag)}
                  key={`tag_${index}`}
                >
                  {`#${tag}`}
                </Button>
              ))
            }
          </div>
          {
            data.map((tag, i) => {
              const posts = tag.edges.map(edge => {
                const frontmatter =  edge.node.frontmatter;
                return {
                  ...frontmatter,
                };
              })
              return (
                <div key={`tag_${tag.name}`}>
                  <Typography
                    variant="title"
                    component="p"
                    classes={{
                      display1: classes.display1
                    }}
                  >
                    {tag.name} ({posts.length})
                  </Typography>
                  <ol>
                    {
                      posts.map((post, j) => (
                        <li key={`post${j}_in_${tag.name}`}>
                          <Typography
                            variant="display1"
                            component="p"
                            classes={{
                              display1: classes.display1
                            }}
                          >
                            {post.title} - {moment(post.created, 'YYYY-MM-DD HH: mm').format('D MMMM YYYY')}
                          </Typography>
                        </li>
                      ))
                    }
                  </ol>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(Tags);

export const tags = graphql`
  query postsByTag {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        name: fieldValue
        edges {
          node {
            frontmatter {
              title
              created
            }
          }
        }
      }
    }
  }
`