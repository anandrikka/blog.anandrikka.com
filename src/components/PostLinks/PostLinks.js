import React from 'react';
import {withRouter} from 'react-router-dom';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    [`${theme.breakpoints.up('md')}`]: {
      flexDirection: 'row',
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PostLinks = ({prev, next, history, classes}) => {
  const goto = (url) => {
    history.push(url);
  };
  return (
    <div className={classes.root}>
      { prev && (
          <Button
            color="secondary"
            className={classes.button}
            className={classes.button}
            onClick={() => goto(prev.url)}
          >
            <KeyboardArrowLeft className={classes.leftIcon} />
            {prev.title}
          </Button>
        )
      }
      { next && (
          <Button
            color="secondary"
            className={classes.button}
            onClick={() => goto(next.url)}
          >
            {next.title}
            <KeyboardArrowRight className={classes.rightIcon} />
          </Button>
        )
      }
    </div>
  );
};

PostLinks.propTypes = {
  prev: PropTypes.object,
  next: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(injectSheet(styles)(PostLinks));
