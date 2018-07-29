import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
});

const NavMenuItem = ({Component, classes, text, url, gotoPage, openWindow}) => {
  return (
    <ListItem
      button
      onClick={
        () => !openWindow ? gotoPage(url) : window.open('/rss.xml', '_blank')
      }
    >
      <ListItemIcon>
        <Component/>
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

NavMenuItem.defaultProps = {
  gotoPage: () => {},
};

NavMenuItem.propTypes = {
  Component: PropTypes.any,
  text: PropTypes.string,
  url: PropTypes.string,
  gotoPage: PropTypes.func,
  openWindow: PropTypes.bool,
  classes: PropTypes.object,
};

export default injectSheet(styles)(NavMenuItem);
