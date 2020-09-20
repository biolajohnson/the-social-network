import React, { Fragment } from "react";
import { Navbar } from "./components/Layout/Navbar";
import { Landing } from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Layout/alert";
//redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
