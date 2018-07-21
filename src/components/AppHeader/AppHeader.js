import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

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
    right: 0
  },
  avatar: {
    margin: 10,
  }
});

class AppHeader extends React.Component {
  render() {
    const { classes, toggleMenu } = this.props;
    return (
      <Hidden mdUp>
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
          </Toolbar>
        </AppBar>
      </Hidden>
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
