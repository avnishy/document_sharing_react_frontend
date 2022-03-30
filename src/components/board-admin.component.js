import React, { Component } from "react";
import axios from 'axios';
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';
export default class BoardAdmin extends Component {
    constructor(props) {
      super(props)
      this.state = {
        users: []
      };
    }
    componentDidMount() {
      axios.get('http://localhost:8080/api/document/getuserlist')
        .then(res => {
          this.setState({
            users: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }
    DataTable() {
      return this.state.users.map((res, i) => {
        return <UserTableRow obj={res} key={i} />;
      });
    }
  
    render() {
      return (
        <div className="shadow-lg m-3 p-2 rounded">
        <Container className="justify-content-center p-2 ">
        <h1 >Registered User</h1>
        <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>E-Mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.DataTable()}
          </tbody>
        </Table>
      </div>
      </Container>
      </div>);
    }
  }