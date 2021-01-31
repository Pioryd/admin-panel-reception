import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Page } from "./Page";


function App() {
  return (
    <BrowserRouter>
      <Page>
        <Switch>
        </Switch>
      </Page>
    </BrowserRouter>
  );
}

export default App;
