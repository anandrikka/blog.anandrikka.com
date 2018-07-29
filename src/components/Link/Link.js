import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = (theme) => ({
  appLink: {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
    borderBottom: '1px solid #e0d6eb',
    boxShadow: 'inset 0 -2px 0px 0px #e0d6eb',
    fontWeight: 'bold',
  },
  ['&:hover']: {
    backgroundColor: '#e0d6eb',
  },
});

const AppLink = ({classes, children, url, newWindow}) => {
  if (newWindow) {
    return (
      <a href={url} target="_blank" className={classes.appLink}>
        {children}
      </a>
    );
  }
  return <a href={url} className={classes.appLink}>{children}</a>;
};

AppLink.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]),
  url: PropTypes.string,
  newWindow: PropTypes.bool,
};

export default injectSheet(styles)(AppLink);
