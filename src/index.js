import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './redux/configureStore';
import './index.css';
import App from './components/App/';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

const renderApp = () => {
  const rootElement = document.getElementById('root');
  render (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    rootElement
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/App/', renderApp);
  }


  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
}

renderApp();

