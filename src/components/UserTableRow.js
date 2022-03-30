import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'

export default class UserTableRow extends Component {
     constructor(props) {
         super(props);
        this.deleteUser = this.deleteUser.bind(this);
    }
    deleteUser() {
        axios.delete('http://localhost:8080/user/'+this.props.obj.id)
            .then((res) => {
                alert('User successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            window.location.reload(true);

    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.username}</td>
                <td>{this.props.obj.email}</td>
                <td>
                    <Button onClick={this.deleteUser} size="sm" variant="success"> Edit </Button>{' | '}
                    <Button onClick={this.deleteUser} size="sm" variant="danger"> Delete </Button>
                </td>
            </tr>
        );
    }
}