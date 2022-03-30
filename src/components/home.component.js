import React, { Component } from "react";
import UserService from "../services/user.service";
import { BsTwitter, BsFillHddNetworkFill, BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h1 className="display-6 shadow-lg p-3 mb-5 bg-light rounded">
           <b> Document Sharing Platform</b>
          </h1>
          <p className="lead shadow p-3 mb-5 bg-body rounded">
            {" "}
            User can Add & see Documents and give Comments on Published Document{" "}
          </p>
          <p className="lead shadow p-3 mb-5 bg-body rounded">
            {" "}
            Reviewers can only see and give Comment on Published sDocuments{" "}
          </p>
          <p className="lead shadow p-3 mb-5 bg-body rounded">
            {" "}
            Admin can Manage Users and decide theirs Privileges{" "}
          </p>
          <p className="lead shadow p-3 mb-5 bg-body rounded">
            {" "}
            On Signup Your Default Role is Assigned as Reviewer Which can be
            Changed by Admin only{" "}
          </p>
        </header>
        
        <div className="row g-0">
          <div className="col-sm-6 col-md-8">Made with &hearts;	By Avnish </div>
          <div className="col-6 col-md-4"><h5 className="allignLeft"> <BsFillHddNetworkFill/> {this.state.content}</h5></div>
          <div>
            <h3>
            <a className="fa" href="https://twitter.com/avnishy84"><BsTwitter/></a>
            <a className="fa" href="https://www.linkedin.com/in/avnishy84/"><BsLinkedin/></a>
            <a className="fa" href="https://github.com/avnishy"><BsGithub/></a>
            <a className="fa" href="https://www.instagram.com/"><BsInstagram/></a>
            </h3>
          </div>
          
        </div>
      </div>
    );
  }
}
