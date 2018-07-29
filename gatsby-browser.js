import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';

import createStore from './src/store';

exports.onInitialClientRender = function() {
  const styles = window.document.getElementById('server-side-jss');
  styles && styles.parentNode.removeChild(styles);
};

exports.replaceRouterComponent = ({history}) => {
  const store = createStore();
  const ConnectedRouterWrapper = ({children}) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
  ConnectedRouterWrapper.propTypes = {
    children: PropTypes.object.isRequired,
  };
  return ConnectedRouterWrapper;
};
