import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import DocumentCard from "./DocumentCard";

export default class ShowDocuments extends Component {
	constructor(props){
	super(props)
	this.state = {
		documents: []
	  };
	}
	componentDidMount(){
    axios.get('http://localhost:8080/api/document/published')
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
        <h1 >Show All Published Documents</h1>
        <hr />

        <Row>
          {this.state.documents.map(document => {
            return <Col md={6} lg={4} sm={12} key={document.id}>
                <DocumentCard document={document} />
              </Col>
          })
		  }
        </Row>
      </Container>
    </>
  );
}
}