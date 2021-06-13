import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

// import connect() function and react redux
import { createStore }  from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';

import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());
// const store = createStore(moviesApp);


// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Container className="container-fluid">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
