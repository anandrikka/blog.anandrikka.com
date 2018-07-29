
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {MuiThemeProvider} from '@material-ui/core/styles';
import injectSheet from 'react-jss';
import {Scrollbars} from 'react-custom-scrollbars';
import 'prismjs/themes/prism-okaidia.css';

import AppHeader from '../components/AppHeader';
import NavigationDrawer from '../components/NavigationDrawer';

import theme from '../styles/theme';
import '../styles/scss/main.scss';

const breakpoints = theme.breakpoints;
const sm = breakpoints.values.sm;
const md = breakpoints.values.md;
const lg = breakpoints.values.lg;

const styles = {
  appContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    overflow: 'hidden',
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
  toolbar: theme.mixins.toolbar,
  grid: {
    [`@media (max-width : ${sm - 1}px)`]: {
      margin: '15px 15px',
    },
    [`@media (min-width: ${sm}px) and (max-width: ${md - 1}px)`]: {
      margin: '15px 2em',
    },
    [`@media (min-width: ${md}px) and (max-width: ${lg - 1}px)`]: {
      margin: '15px 3em',
    },
    [`@media (min-width: ${lg}px)`]: {
      margin: '15px 10em',
    },
  },
};

const Layout = ({classes, children, data: {site: {siteMetadata}}}) => (
  <MuiThemeProvider theme={theme}>
    <Helmet
      title={siteMetadata.title}
      meta={[
        {name: 'description', content: siteMetadata.description},
        {name: 'author', content: siteMetadata.author},
        {name: 'url', content: siteMetadata.url},
      ]}
    />
    <div className={classes.appContainer}>
      <AppHeader />
      <NavigationDrawer />
      <main>
        <div className={classes.toolbar} />
        <Scrollbars className={classes.scrollbars}>
          <div className={classes.grid}>
            {children()}
          </div>
        </Scrollbars>
      </main>
    </div>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.func,
  classes: PropTypes.object,
  data: PropTypes.object,
};

export default injectSheet(styles)(Layout);

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
        url
        keywords
        description
      }
    }
  }
`;
