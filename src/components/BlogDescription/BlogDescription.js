import React from 'react';
import injectSheet from 'react-jss';
import purple from "@material-ui/core/colors/purple";

const styles = theme => ({
  wrapper: {
    display: 'none',
    [`${theme.breakpoints.up('md')}`]: {
      background: `linear-gradient(60deg, ${purple[400]}, ${purple[600]})`,
      width: '320px',
      height: '100vh',
      display: 'flex'
    }
  }
});

class Profile extends React.Component {
  render() {
    const { classes }  = this.props;
    return (
      <div className={classes.wrapper}>

      </div>
    )
  }
}

export default injectSheet(styles)(Profile);
