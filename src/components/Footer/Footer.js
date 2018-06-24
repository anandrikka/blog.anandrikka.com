import React from 'react';
import injectSheet from 'react-jss';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '40px',
    width: '100%',
    position: 'relative',
    '&::before': {
      content: '""',
      left: 0,
      right: 0,
      top: 0,
      position: 'absolute',
      borderTop: `1px solid ${theme.palette.divider}`
    },
    [`${theme.breakpoints.up('md')}`]: {
      display: 'none'
    }
  }
})

const Footer = ({ classes }) => (
  <footer className={classes.root}>
    <Typography variant="caption">
      2018 &copy; Anand Reddy Rikka
    </Typography>
  </footer>
)

export default injectSheet(styles)(Footer);
