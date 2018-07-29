import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const NavButton = ({classes, path, Icon, label, onClick}) => (
  <Button
    color="primary"
    variant={'contained'}
    className={classes.button}
    onClick={() => onClick(path)}
  >
    <Icon />
    {label}
  </Button>
);

NavButton.propTypes = {
  Icon: PropTypes.any,
  label: PropTypes.string,
  path: PropTypes.string,
  classes: PropTypes.object,
  onClick: PropTypes.func,
};

export default injectSheet(styles)(NavButton);
