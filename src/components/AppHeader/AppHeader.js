import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

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
  }
});

class AppHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar
        position="static"
        classes={{
          root: classes.root,
        }}
      >
        <Toolbar>
          <IconButton color="default" aria-label="Menu" className={classes.menu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit">
            Beginner's Blog
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(AppHeader);
