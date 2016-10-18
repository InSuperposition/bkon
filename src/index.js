import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// import function to create Redux store
import App from './App';

const rootEl = document.getElementById('app');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootEl
);

// Enable Hot Module reloading for development
if (module.hot) {
  module.hot.accept(App, () => {
    const NextApp = App;

    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootEl
    );
  });
}
