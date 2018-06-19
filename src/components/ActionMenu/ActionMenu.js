import React from 'react';
import injectSheet from 'react-jss';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import FullScreen from '@material-ui/icons/Fullscreen';
import FullScreenExit from '@material-ui/icons/FullscreenExit';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50px',
    width: '100%',
    '&::before': {
      content: '""',
      left: 0,
      right: 0,
      top: 0,
      position: 'absolute',
      borderTop: `1px solid ${theme.palette.divider}`
    },
    [`${theme.breakpoints.up('md')}`]: {
      flexDirection: 'column',
      left: 'auto',
      height: '100%',
      width: '50px',
      '&::before': {
        position: 'absolute',
        content: '""',
        height: '100%',
        width: 0,
        borderLeft: `1px solid ${theme.palette.divider}`
      }
    }
  },
  iconGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [`${theme.breakpoints.up('md')}`]: {
      flexDirection: 'column'
    }
  }
});

class ActionMenu extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div className={classes.iconGroup}>
          <IconButton>
            <HomeIcon/>
          </IconButton>
          <IconButton>
            <SearchIcon/>
          </IconButton>
        </div>
        <div className={classes.iconGroup}>
          <IconButton>
            <FullScreen/>
          </IconButton>
          <IconButton>
            <ArrowUpwardIcon/>
          </IconButton>
        </div>
      </div>
    )
  }
}

export default injectSheet(styles)(ActionMenu);
