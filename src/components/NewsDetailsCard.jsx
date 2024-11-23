import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NewsDetailsCard = ({ title, text, image, link }) => {
  return (
    <Card className="custom-card " style={{ width: '20rem',height: '25rem', overflow: 'hidden' }}>
      <Card.Img variant="top" src={image}  className="card-image h-100" />
      <Card.Body className="card-overlay">
        <Card.Title>{title}</Card.Title>
        <Card.Text className='overflow-auto'>{text}</Card.Text>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Button variant="primary">DETAILS</Button>
        </a>
      </Card.Body>
    </Card>
  );
}

export default NewsDetailsCard;
