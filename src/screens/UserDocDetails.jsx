import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


const UserDocDetails = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [link,setLink] = useState('')
    const [documentDescription, setDocumentDescription] = useState('')
    const [published, setPublished] = useState(true)

    // review rating  description
    const [reviews, setReviews] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {

        const getSingleDocumentData = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/document/getdocumentReviews/${id}`)
            console.log(data)
            setTitle(data.title)
            setLink(data.linkurl)
            setDocumentDescription(data.description)
            setPublished(data.published)
            // for reviews
            setReviews(data.review)
        }
        getSingleDocumentData()

    }, [id])

    // handling Delete

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/document/${id}`)
        history.push('/user')
    }
    // to add review
    const addReviewHandler = async (e) => {

        e.preventDefault()

        let review = {
            document_id: id,
            name: name,
            description: description
        }

        await axios.post(`http://localhost:8080/api/document/addReview/${id}`, review)
        window.location.reload(true);

        //history.push(`/userdocument/${id}`)
    }




    return (
        <>

            <Container className="mt-10 p-4">
                <h1 className="text-center">Detail Document</h1>
                <hr />

                <Row>
                    <Col md={8} lg={8} sm={8}>
                        <Card className='shadow-lg m-3 p-2 rounded'>
                            <Card.Body>
                                <Card.Title>Title: {title}</Card.Title>
                                <Card.Text>
                                    Description: {documentDescription}
                                </Card.Text>
                                <Card.Text>
                                    Published: {published ? (<small>True</small>) : (<small>false</small>)}
                                </Card.Text>
                                <br />

                                <Button variant="success" href={link}>Download</Button>{' '}
  

                                <Link to={`/document/edit/${id}`}>
                                    <Button>Edit</Button>
                                </Link>

                                <Button className="btn btn-danger m-2" onClick={() => handleDelete(id)}>Delete</Button>

                            </Card.Body>
                        </Card>
                    </Col>


                    <Col md={4} lg={4} sm={4}>

                        <h2 className='text-center'>Add Review</h2>
                        <hr />

                        <Form onSubmit={addReviewHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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


                            <Button variant="primary" type="submit">
                                Add Comment
                            </Button>
                        </Form>

                        <br />

                        <h5>Document Comments</h5>
                        <hr />

                        {reviews.length > 0 ? (
                            reviews.map(review => {
                                return <p key={review.id}>Name: {review.name} <br /> {review.description}</p>
                            })
                        ) : (<p> No Comments for this Document </p>)}


                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default UserDocDetails