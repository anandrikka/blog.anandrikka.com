import es6Promise from 'es6-promise';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

es6Promise();

let styles;
if (process.env.NODE_ENV === 'production') {
  try {
    styles = require('!raw-loader!../public/styles.css');
  } catch (e) {
    // console.log(e);
  }
}

/* eslint-disable */

class HTML extends Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = (
        <style
          id="gatsby-inline-css"
          dangerouslySetInnerHTML={{__html: styles}}
        />
      );
    }
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents,
    } = this.props;
    return (
      <html {htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {headComponents}
          {css}
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#D0E0D8" />
          <meta name="apple-mobile-web-app-title" content="Lazywill" />
          <link href="/img/favicon.png" rel="icon" />
        </head>
        <body {bodyAttributes}>
          <noscript>You need to enable JavaScript to run this app!</noscript>
          {preBodyComponents}
          <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.any,
  bodyAttributes: PropTypes.any,
  headComponents: PropTypes.any,
  preBodyComponents: PropTypes.any,
  postBodyComponents: PropTypes.any,
};

module.exports = HTML;
