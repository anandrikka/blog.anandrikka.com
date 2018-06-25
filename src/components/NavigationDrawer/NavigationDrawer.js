import React from 'react';
import injectSheet from 'react-jss';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import RssIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import CardMedia from '@material-ui/core/CardMedia';
import { connect } from 'react-redux';
import Menu from '../Menu';

import { toggleMenu as menuToggle } from "../../store";
import appTheme from '../../styles/theme';
import mobileImg from '../../assets/img/mobile_sidebar_img.jpg';

const styles = theme => ({
  drawerPaper: {
    width: 240
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
  }
});

class NavigationDrawer extends React.Component {
  render() {
    const { classes, toggleMenu, menuSwitch } = this.props;
    return (
      <Hidden mdUp>
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
          <div className={classes.drawerHeader}>
            <CardMedia
              className={classes.media}
              image={mobileImg}
              title={"Beginner's Blog"}
            />
          </div>
          <Divider />
          <Menu />
        </Drawer>
      </Hidden>
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
