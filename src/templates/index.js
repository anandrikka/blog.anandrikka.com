import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import PaginatedCards from '../components/PaginatedCards';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
});

const IndexPage = ({
  classes,
  pathContext,
}) => (
  <div className={classes.root}>
    <PaginatedCards data={pathContext} />
  </div>
);

IndexPage.propTypes = {
  classes: PropTypes.object,
  pathContext: PropTypes.object,
};

export default injectSheet(styles)(IndexPage);
