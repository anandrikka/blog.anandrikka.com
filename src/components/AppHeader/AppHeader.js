import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import RssIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

import MenuIconItem from '../MenuIconItem';

import profileImg from '../../assets/img/covers/profile.jpeg';
import { toggleMenu } from '../../store';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    // display: 'flex',
    background: '#ffffff'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menu: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    lineHeight: '64px',
    ['@media (max-width:600px)']: {
      lineHeight: '56px',
    },
    ['@media (min-width:0px) and (orientiation: landscape)']: {
      lineHeight: '48px'
    }
  },
  avatarContainer: {
    position: 'absolute',
    [`${theme.breakpoints.down('md')}`]: {
      right: 0
    },
    [`${theme.breakpoints.up('md')}`]: {
      left: 0
    }
  },
  menuItems: {
    position: 'absolute',
    right: 0,
    display: 'none',
    [`${theme.breakpoints.up('md')}`]: {
      display: 'flex'
    }
  },
  menuItemIcon: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    margin: 10,
  }
});

class AppHeader extends React.Component {
  render() {
    const { classes, toggleMenu } = this.props;
    return (
      <AppBar
        position="absolute"
        classes={{
          root: classes.root,
        }}
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton color="default" aria-label="Menu" className={classes.menu} onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            align="center"
            classes={{
              title: classes.title
            }}
            className={classes.title}
          >
            Beginner's Blog
          </Typography>
          <div className={classes.avatarContainer}>
            <Avatar
              alt="AR"
              src={profileImg}
              className={`${classes.avatar}`}
            />
          </div>
          <div className={classes.menuItems}>
            <MenuIconItem Component={BookmarkIcon} />
            <MenuIconItem Component={FlagIcon} />
            <MenuIconItem Component={ArchiveIcon} />
            <MenuIconItem Component={RssIcon} />
            <MenuIconItem Component={SearchIcon} />
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  dispatch => ({
    toggleMenu: () => dispatch(toggleMenu())
  })
)(injectSheet(styles)(AppHeader));
