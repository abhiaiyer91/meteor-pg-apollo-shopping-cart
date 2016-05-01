import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';
import ApolloClient from 'apollo-client';
import { Provider } from 'react-apollo';

const client = new ApolloClient();

Meteor.startup(() => {
  render(<Provider client={client}>
    <div></div>
    </Provider>, document.getElementById('app'));
});
