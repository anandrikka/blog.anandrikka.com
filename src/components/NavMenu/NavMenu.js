import React from 'react';
import injectSheet from 'react-jss';
import List from '@material-ui/core/List';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import RssIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NavMenuItem from './NavMenuItem';

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
      <NavMenuItem Component={HomeIcon} text={'Home'} url={'/'} gotoPage={gotoPage} />
      <NavMenuItem Component={BookmarkIcon} text={'Categories'} url={'/categories'} gotoPage={gotoPage} />
      <NavMenuItem Component={FlagIcon} text={'Tags'} url={'/tags'} gotoPage={gotoPage} />
      <NavMenuItem Component={ArchiveIcon} text={'Archives'} url={'/archives'} gotoPage={gotoPage} />
      <NavMenuItem Component={RssIcon} text={'Rss Feed'} openWindow />
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

