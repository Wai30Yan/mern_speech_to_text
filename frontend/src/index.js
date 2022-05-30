import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';

import reducers from './reducers/index'

const persistConfig = {
  key: 'main-root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)))

const Persistor = persistStore(store)
 
//const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={Persistor} >
      <Router>
        <App/>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

