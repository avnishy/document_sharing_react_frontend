import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardReviewer from "./components/board-reviewer.component";
import BoardAdmin from "./components/board-admin.component";
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddProduct from './screens/AddProduct';
import EditProduct from './screens/EditProduct';
import ProductDetail from './screens/ProductDetail';
import ShowProducts from './screens/ShowProducts'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showReviewerBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showReviewerBoard: user.roles.includes("ROLE_REVIEWER"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const { currentUser, showReviewerBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            DocSharing Platform
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showReviewerBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                Reviewer Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Add User
              </Link>
            </li>
            </div>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Dashboard
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Router>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/rev" component={BoardReviewer} />
            <Route path="/admin" component={BoardAdmin} />
            <Route exact path='/addDocument' component={AddProduct} />
            <Route exact path='/product/edit/:id' component={EditProduct} />
            <Route exact path='/product/:id' component={ProductDetail} />
            <Route exact path='/products' component={ShowProducts} />
          </Switch>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;