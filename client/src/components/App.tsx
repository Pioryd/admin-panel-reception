import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Page from "./Page";

import Appointments from "../pages/Appointments";
import Companies from "../pages/Companies";
import Customers from "../pages/Customers";
import Home from "../pages/Home";

function App() {
  return (
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
  );
}

export default App;
