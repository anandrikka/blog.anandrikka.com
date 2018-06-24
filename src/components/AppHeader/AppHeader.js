import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

import profileImg from '../../assets/img/covers/profile.jpeg';
import { toggleMenu } from '../../store';

const styles = theme => ({
  root: {
    boxShadow: 'none',
    display: 'flex',
    background: '#ffffff',
    [`${theme.breakpoints.up('md')}`]: {
      display: 'none'
    }
  },
  menu: {
    marginLeft: -12,
    marginRight: 20,
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
      <AppBar
        position="static"
        classes={{
          root: classes.root,
        }}
      >
        <Toolbar>
          <IconButton color="default" aria-label="Menu" className={classes.menu} onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title">
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
