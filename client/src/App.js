import React, { Fragment, useEffect } from "react";
import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Layout/alert";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
//redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import setAuthToken from "./utils/authSetToken";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/ProfileData/CreateProfile";
import EditProfile from "./components/ProfileData/EditProfile";
import AddExperience from "./components/ProfileData/AddExperience";
import AddEducation from "./components/ProfileData/AddEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/Profile/Profile";
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
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
