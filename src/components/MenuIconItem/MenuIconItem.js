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

const MenuIconItem = ({Component, classes, gotoPage, url, openWindow}) => (
  <React.Fragment>
    <IconButton
      color="default"
      className={classes.menuItemIcon}
      onClick={
        () => !openWindow ? gotoPage(url) : window.open('/rss.xml', '_blank')
      }
    >
      <Component />
    </IconButton>
  </React.Fragment>
);

MenuIconItem.propTypes = {
  Component: PropTypes.any,
  classes: PropTypes.object,
  gotoPage: PropTypes.func,
  url: PropTypes.string,
  openWindow: PropTypes.bool,
};

export default injectSheet(styles)(MenuIconItem);
