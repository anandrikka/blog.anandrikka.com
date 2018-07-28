import React from 'react';
import injectSheet from 'react-jss';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import Menu from '../NavMenu';

import { toggleMenu as menuToggle } from "../../store";

const styles = theme => ({
  drawerPaper: {
    width: 240,
    position: 'relative'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    ...theme.mixins.toolbar,
  },
  media: {
    minHeight: 150,
    width: '100%',
    backgroundRepeat: 'repeat',
    backgroundSize: 'contain'
  },
  toolbar: theme.mixins.toolbar
});

class NavigationDrawer extends React.Component {
  render() {
    const { classes, toggleMenu, menuSwitch } = this.props;
    return (
      <Drawer
        variant="temporary"
        anchor="left"
        open={toggleMenu}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better Mobile Performance
        }}
        onClose={menuSwitch}
      >
        <div className={classes.toolbar}>
          <Typography variant="title">
            Beginner's Blog
          </Typography>
        </div>
        <Divider />
        <Menu />
      </Drawer>
    )
  }
}
export default connect(
  state => ({
    toggleMenu: state.toggleMenu
  }),
  dispatch => ({
    menuSwitch: () => dispatch(menuToggle())
  })
)(injectSheet(styles)(NavigationDrawer));
