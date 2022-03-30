import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap'
import AuthService from "../services/auth.service";

import { useParams } from 'react-router'
import axios from 'axios'


const DocumentDetail = () => {

    const { id } = useParams()
   
    const [title, setTitle] = useState('')
    const [link,setLink] = useState('')
    const [documentDescription, setDocumentDescription] = useState('')
   
    // review rating  description
    const [reviews, setReviews] = useState([])
    const [description, setDescription] = useState('')
    const [userName, setDocumentUserName] = useState('')

    useEffect(() => {

        const getSingleDocumentData = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/document/getdocumentReviews/${id}`)
            console.log(data)
            setTitle(data.title)
            setLink(data.linkurl)
            setDocumentDescription(data.description)
            setDocumentUserName(data.userName)
            setReviews(data.review)
        }
        getSingleDocumentData()

    }, [id])

    // to add review
    const addReviewHandler = async (e) => {

        e.preventDefault()
        const user=  AuthService.getCurrentUser();
        const username = user.username;

        let review = {
            document_id: id,
            name: username,
            description: description
        }

        await axios.post(`http://localhost:8080/api/document/addReview/${id}`, review)

        window.location.reload(true);
    }
    return (
        <>

            <Container className="mt-10 p-4">
                <h1>Detail Document</h1>
                <hr />

                <Row>
                    <Col md={8} lg={8} sm={8}>
                        <Card className='shadow-lg m-3 p-2 rounded'>
                            <Card.Body>
                                <Card.Title>Title: {title}</Card.Title>
                                <Card.Title>Author: {userName}</Card.Title>
                                <Card.Text>
                                    Description: {documentDescription}
                                </Card.Text>

                                <Button variant="success" href={link}>Download</Button>{' '}

                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={4} lg={4} sm={4}>

                        <h2 className='text-center'>Add Review</h2>
                        <hr />

                        <Form onSubmit={addReviewHandler}>
                        <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    as="textarea"
                                    required='true'
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Add Comment
                            </Button>
                        </Form>

                        <br />

                        <h5>Document Comments</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}><b>{review.name} :</b><></> {review.description}</p>
                            })
                        ) : (<p> No Comments for this Document </p>)}


                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default DocumentDetail