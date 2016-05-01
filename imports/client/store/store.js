import { createStore, combineReducers, applyMiddleware } from 'redux';
import apolloClient from '/imports/client/apollo-client';
import openMenu from '/imports/client/reducers/rootReducer';
import createLogger from 'redux-logger';
const rootReducer = combineReducers({
  openMenu,
  apollo: apolloClient.reducer()
});

const Store = createStore(rootReducer, {}, applyMiddleware(apolloClient.middleware(), createLogger()));

export default Store;
