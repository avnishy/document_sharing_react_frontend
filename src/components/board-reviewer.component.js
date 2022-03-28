import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import UserDocDetails from "./UserDocumentCard";
import AuthService from "../services/auth.service";

export default class BoardReviewer extends Component {
	constructor(props){
	super(props)
	this.state = {
		documents: []
	  };
	}
	componentDidMount(){
    const user=  AuthService.getCurrentUser();
    const id = user.id;
    axios.get(`http://localhost:8080/api/document/getuserdoc/${id}`)
      .then(res => {
        this.setState({
			documents: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
render() {
  return (
    <>
      <Container className="justify-content-center p-2">
        <h1>Show All Published Documents</h1>
        <hr />

        <Row>
          {this.state.documents.map(document => {
            return <Col md={6} lg={4} sm={12} key={document.id}>
                <UserDocDetails document={document} />
              </Col>
          })
		  }
        </Row>
      </Container>
    </>
  );
}
}