import Button from 'react-bootstrap/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const DocumentCard = ({ document }) => {
   
    return (
        <>
            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Author: {document.userName}</Card.Title>
                    <Card.Title>Title: {document.title}</Card.Title>
                    <Card.Title>ID:{document.id}</Card.Title>
                    <Card.Text>
                        Description: {document.description.slice(0,17)}...
                    </Card.Text>
                    <Link to={`document/${document.id}`}>
                        <Button>Detail</Button>
                    </Link>
                </Card.Body>
             </Card>
        </>
    )
}
export default DocumentCard
