import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Signup from './components/SignupForm';

import { ApolloProvider, ApolloClient,InMemoryCache, createHttpLink} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// establish new link to GraphQl
const httpLink = createHttpLink({
  uri:'/graphql'
});
// retrieve token for every request to the API
const authLink = setContext((_, { headers }) => {
    // retrieve toekn from localStorage and set HTTP request headers
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
//new connection to api endpoint
const client = new ApolloClient({
  // every request now has token and sets headers
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    // everything in btw ApolloProvider will have access to servers API data through the client we set up 
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            {/* <Route exact path='/saved' component={SavedBooks} /> */}
            {/* <Route exact path='/login' component={Login} /> */}
            {/* <Route exact path='/signup' component={Signup} /> */}
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
