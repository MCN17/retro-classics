import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// import pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Success from './pages/Success';
import OrderHistory from "./pages/OrderHistory";

// import components
import Navbar from './components/Navbar';

import { StoreProvider } from  "./utils/GlobalState";


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <StoreProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/products/:id" element={<Detail/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/success" element={<Success/>} />
              <Route path="/orderhistory" element={<OrderHistory/>} />
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
