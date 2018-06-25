import React from 'react';
import injectSheet from 'react-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import RssIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { toggleMenu as menuToggle } from "../../store";

const styles = theme => ({

});

const Menu = ({ classes, history, menuSwitch }) => {
  const gotoPage = (route) => {
    menuSwitch();
    history.push(route);
  }
  return (
    <List>
      <ListItem button onClick={() => gotoPage('/')}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <Hidden mdDown>
        <ListItem button onClick={() => gotoPage('search')}>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </Hidden>
      <ListItem button onClick={() => gotoPage('/categories')}>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <ListItem button onClick={() => gotoPage('/tags')}>
        <ListItemIcon>
          <FlagIcon />
        </ListItemIcon>
        <ListItemText primary="Tags" />
      </ListItem>
      <ListItem button onClick={() => gotoPage('/archives')}>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archives" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <RssIcon />
        </ListItemIcon>
        <ListItemText primary="Rss Feed" />
      </ListItem>
    </List>
  )
}

const storeConnect = connect(
  null,
  dispatch => ({
    menuSwitch: () => dispatch(menuToggle())
  })
);

export default injectSheet(styles)(storeConnect(withRouter(Menu)));

