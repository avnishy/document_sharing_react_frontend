import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AuthService from "../services/auth.service";
const API_URL = "http://localhost:8080/api/document/";



const AddProduct = ({ history }) => {
        

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState('')
    const [document, setImage] = useState('')

    const addProductHandler = async (e) => {

        e.preventDefault()
        const user=  AuthService.getCurrentUser();
        const userID = user.id;

        const formData = new FormData()

        formData.append('document', document)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('published', published)
        await axios.post(API_URL + `adddocument/${userID}`, formData)
        history.push('/rev')
    }


    return (
        <>
            <Container className='mt-5 p-5 shadow-lg bg-light rounded '>
                <h1>Add Product</h1>
                <hr />

                <Form onSubmit={addProductHandler} method="POST" encType='multipart/form-data'>

                <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                        type="file"
                        name='image'
                        onChange={(e) => setImage(e.target.files[0])}
                        size="lg" />
                </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                          />
                    </Form.Group>
                  
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                           />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default AddProduct
