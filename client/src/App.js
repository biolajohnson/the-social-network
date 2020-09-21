import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import { Landing } from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Layout/alert";
import { loadUser } from "./actions/auth";
//redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/authSetToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
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
};

export default App;
