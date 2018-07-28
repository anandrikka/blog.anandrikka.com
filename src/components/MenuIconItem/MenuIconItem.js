import React from 'react'
import injectSheet from 'react-jss';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  menuIconItem: {
    marginLeft: -12,
    marginRight: 20,
  }
});

const MenuIconItem = ({ Component, classes }) => (
  <React.Fragment>
    <IconButton color="default" className={classes.menuItemIcon}>
      <Component />
    </IconButton>
  </React.Fragment>
);

export default injectSheet(styles)(MenuIconItem);
