
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import injectSheet from 'react-jss';
import Grid from '@material-ui/core/Grid';
import { Scrollbars } from 'react-custom-scrollbars';
import Hidden from '@material-ui/core/Hidden'
import Scrollbar from '../components/common/Scrollbar';
import AppHeader from '../components/AppHeader';
import Footer from '../components/Footer';
import BlogDescription from '../components/BlogDescription';
import NavigationDrawer from '../components/NavigationDrawer';

import theme from '../styles/theme';
import 'prismjs/themes/prism-okaidia.css';
import '../styles/scss/main.scss';

const brakepoints = theme.breakpoints;

const styles = {
  appContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    overflow: 'hidden'
  },
  mdBelowContent: {
    minHeight: `calc(100vh - 64px)`,
    ['@media (max-width:600px)']: {
      minHeight: `calc(100vh - 56px)`,
    },
    ['@media (min-width:0px) and (orientiation: landscape)']: {
      minHeight: 'calc(100vh - 48px)'
    }
  },
  mdAboveContent: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    flexFlow: 'row wrap',
    [`${theme.breakpoints.down(theme.breakpoints.values.md)}`]: {
      display: 'none'
    },
    '& .left-block': {
      width: '300px',
      position: 'fixed',
      left: 0,
      textAlign: 'center',
      height: '100vh',
      backgroundColor: theme.palette.common.white
    },
    '& .right-block': {
      minHeight: '100vh'
    }
  },
  content: {
    // padding: theme.spacing.unit * 3,
    [`${brakepoints.up('md')}`]: {
      padding: 0
    }
  },
  pageContent: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100vh - 64px)`,
    ['@media (max-width:600px)']: {
      height: `calc(100vh - 56px)`,
    },
    [`${brakepoints.up('md')}`]: {
      height: '100vh',
      flexDirection: 'row'
    },
    ['@media (min-width:0px) and (orientiation: landscape)']: {
      height: 'calc(100vh - 48px)'
    }
  },
  route: {
    height: 'calc(100vh - 104px)',
    ['@media (max-width:600px)']: {
      height: `calc(100vh - 96px)`,
    },
    [`${brakepoints.up('md')}`]: {
      flexGrow: 1,
      height: '100vh',
    },
    ['@media (min-width:0px) and (orientiation: landscape)']: {
      height: 'calc(100vh - 88px)'
    }
  },
  routeContent: {
    // margin: '16px',
    // padding: '16px',
    backgroundColor: theme.palette.common.white,
    // height: 'calc(100% - 64px)'
    // [`${brakepoints.up('md')}`]: {
    //   margin: 24
    // }
  },
  toolbar: theme.mixins.toolbar,
  grid: {
    [`@media (max-width : ${theme.breakpoints.values.sm - 1}px)`]: {
      margin: '15px 15px'
    },
    [`@media (min-width: ${theme.breakpoints.values.sm}px) and (max-width: ${theme.breakpoints.values.md - 1}px)`]: {
      margin: '15px 2em'
    },
    [`@media (min-width: ${theme.breakpoints.values.md}px) and (max-width: ${theme.breakpoints.values.lg - 1}px)`]: {
      margin: '15px 3em'
    },
    [`@media (min-width: ${theme.breakpoints.values.lg}px)`]: {
      margin: '15px 10em'
    }
  }
};

const Layout = ({ classes, children, data: { site: { siteMetadata } } }) => (
  <MuiThemeProvider theme={theme}>
    <Helmet
      title={siteMetadata.title}
      meta={[
        { name: 'description', content: siteMetadata.description },
        { name: 'author', content: siteMetadata.author },
        { name: 'url', content: siteMetadata.url }
      ]}
    />
    <div className={classes.appContainer}>
      <AppHeader />
      <NavigationDrawer />
      <main>
        <div className={classes.toolbar} />
        <Scrollbars  className={classes.mdBelowContent}>
          <div className={classes.grid}>
            {children()}
          </div>
        </Scrollbars>
      </main>
    </div>
  </MuiThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.func,
}

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
`
