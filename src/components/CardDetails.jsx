import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardDetails = ({ title, text, imgSrc,link }) => {
  return (
    <Card className="custom-card" style={{ width: '18rem', overflow: 'hidden' }}>
      <Card.Img variant="top" src={imgSrc} alt="Card Image" className="card-image" />
      <Card.Body className="card-overlay">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Link to={link}>
          <Button variant="primary">DETAILS</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CardDetails;
