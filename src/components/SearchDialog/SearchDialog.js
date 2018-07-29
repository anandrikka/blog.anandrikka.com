import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {Scrollbars} from 'react-custom-scrollbars';
import SearchInput from '../SearchInput';

import theme from '../../styles/theme';

const breakpoints = theme.breakpoints;
const sm = breakpoints.values.sm;
const md = breakpoints.values.md;
const lg = breakpoints.values.lg;

const styles = (theme) => ({
  root: {
    boxShadow: 'none',
    // display: 'flex',
    background: '#ffffff',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  flex: {
    flex: 1,
  },
  toolbar: theme.mixins.toolbar,
  close: {
    right: 0,
    position: 'absolute',
  },
  scrollbars: {
    minHeight: `calc(100vh - 64px)`,
    ['@media (max-width:600px)']: {
      minHeight: `calc(100vh - 56px)`,
    },
    ['@media (min-width:0px) and (orientiation: landscape)']: {
      minHeight: 'calc(100vh - 48px)',
    },
  },
  grid: {
    // width: '100%',
    [`@media (max-width : ${sm - 1}px)`]: {
      margin: '0 15px',
    },
    [`@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`]: {
      margin: '0 2em',
    },
    [`@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`]: {
      margin: '0 3em',
    },
    [`@media (min-width: ${lg}px)`]: {
      margin: '0 10em',
    },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  render() {
    const {classes, open, handleClose} = this.props;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          position="absolute"
          className={classes.appBar}
          classes={{
            root: classes.root,
          }}
        >
          <Toolbar>
            <SearchInput
              placeholder="Search Here...."
            />
            <IconButton
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbar}></div>
        <Scrollbars className={classes.scrollbars}>
          <div className={classes.grid}>
            <List>
              <ListItem button>
                <ListItemText primary="Phone ringtone" secondary="Titania" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
              <ListItem button>
                <ListItemText
                  primary="Default notification ringtone"
                  secondary="Tethys"
                />
              </ListItem>
            </List>
          </div>
        </Scrollbars>
      </Dialog>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default injectSheet(styles)(FullScreenDialog);
