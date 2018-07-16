import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import PaginatedCards from '../components/PaginatedCards';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch'
  }
});

const CategoryTemplate = ({
  pathContext,
  classes
}) => (
  <div className={classes.root}>
    <PaginatedCards data={pathContext} />
  </div>
)

CategoryTemplate.propTypes = {
  pageResources: PropTypes.object
}

export default injectSheet(styles)(CategoryTemplate);
