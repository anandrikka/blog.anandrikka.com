import React from 'react';
import injectSheet from 'react-jss';

import PaginatedCards from '../components/PaginatedCards';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch'
  }
});

const IndexPage = ({
  classes,
  pathContext
}) => (
  <div className={classes.root}>
    <PaginatedCards data={pathContext} />
  </div>
)

export default injectSheet(styles)(IndexPage);