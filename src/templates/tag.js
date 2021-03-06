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

const TagTemplate = ({
  pathContext,
  classes,
}) => {
  return (
    <div className={classes.root}>
      <PaginatedCards data={pathContext} />
    </div>
  );
};

TagTemplate.propTypes = {
  data: PropTypes.object,
  pathContext: PropTypes.any,
  classes: PropTypes.object,
};

export default injectSheet(styles)(TagTemplate);
