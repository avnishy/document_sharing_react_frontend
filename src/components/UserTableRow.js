import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
export default class UserTableRow extends Component {
    //  constructor(props) {
    //      super(props);
    //     this.deleteStudent = this.deleteStudent.bind(this);
    // }
    // deleteStudent() {
    //     //axios.delete('http://localhost:8080/students/delete-student/' + this.props.obj._id)
    //         // .then((res) => {
    //         //     console.log('Student successfully deleted!')
    //         // }).catch((error) => {
    //         //     console.log(error)
    //         // })
    // }
    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.email}</td>
                <td>
                    <Button onClick={this.deleteStudent} size="sm" variant="success"> Edit </Button>{' | '}
                    <Button onClick={this.deleteStudent} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}