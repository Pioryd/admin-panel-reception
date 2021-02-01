import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import Page from "./Page";

import Appointments from "../pages/Appointments";
import Companies from "../pages/Companies";
import Customers from "../pages/Customers";
import Home from "../pages/Home";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Page>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/customers" component={Customers} />
            <Route exact path="/appointments" component={Appointments} />
          </Switch>
        </Page>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
