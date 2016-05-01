import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import Store from '/imports/client/store/store';
import { Provider } from 'react-apollo';
import apolloClient from '/imports/client/apollo-client';
import ProductList from '/imports/client/components/ProductList';
import Navbar from '/imports/client/components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <ProductList/>
    </div>
  )
}

Meteor.startup(() => {
  render(<Provider client={apolloClient} store={Store}>
    <App />
    </Provider>, document.getElementById('root'));
});
