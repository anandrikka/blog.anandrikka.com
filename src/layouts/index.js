
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { MuiThemeProvider } from '@material-ui/core/styles';
import injectSheet from 'react-jss';

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
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden',
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
    margin: '16px',
    // [`${brakepoints.up('md')}`]: {
    //   margin: 24
    // }
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
    <div className={classes.container}>
      <AppHeader />
      <NavigationDrawer />
      <div className={classes.pageContent}>
        <BlogDescription />
        <div className={classes.route}>
          <Scrollbar>
            <div className={classes.routeContent}>
              {children()}
            </div>
          </Scrollbar>
        </div>
        <Footer />
      </div>
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
