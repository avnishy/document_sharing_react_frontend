import React, { useEffect, useState } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'


const UserDocDetails = () => {

    const { id } = useParams()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [link, setLink] = useState('')
    const [documentDescription, setDocumentDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(() => {

        const getSingleDocumentData = async () => {
            const { data } = await axios.get(`http://localhost:8080/api/document/getdocumentReviews/${id}`)
            console.log(data)
            setTitle(data.title)
            setLink(data.linkurl)
            setDocumentDescription(data.description)
            setPublished(data.published)
        }
        getSingleDocumentData()

    }, [id])

    // handling Delete

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/document/${id}`)
        history.push('/user')
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
                </Row>
            </Container>
        </>
    )
}
export default UserDocDetails