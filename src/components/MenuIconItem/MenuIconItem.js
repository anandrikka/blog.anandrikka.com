import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  menuIconItem: {
    marginLeft: -12,
    marginRight: 20,
  },
});

const MenuIconItem = ({Component, classes}) => (
  <React.Fragment>
    <IconButton color="default" className={classes.menuItemIcon}>
      <Component />
    </IconButton>
  </React.Fragment>
);

MenuIconItem.propTypes = {
  Component: PropTypes.any,
  classes: PropTypes.object,
};

export default injectSheet(styles)(MenuIconItem);
