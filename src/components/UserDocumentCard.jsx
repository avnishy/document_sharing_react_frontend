import Button from 'react-bootstrap/Button'
import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserDocumentCard = ({ document }) => {
    return (
        <>

            <Card className='shadow-lg m-2 p-3 rounded' style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Title: {document.title}</Card.Title>
                    <Card.Title>ID:{document.id}</Card.Title>
                    <Card.Text>
                        Description: {document.description.slice(0,15)}...
                    </Card.Text>
                 
                    <Link to={`userdocument/${document.id}`}>
                        <Button>Detail</Button>
                    </Link>
                </Card.Body>

                
               
            </Card>
       
           
        </>
    )
}

export default UserDocumentCard
