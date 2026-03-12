import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import eventsJson from '../data/events.json';

export default function EventDetails() {
  const { name } = useParams();
  const event = eventsJson.find((e) => e.name === name);

  if (!event) {
    return (
        <Container className="mt-5">
            <h2>Event not found</h2>
        </Container>
    )
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={`/images/${event.img}`} style={{ height: '300px', objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>{event.name}</Card.Title>
              <Card.Text>{event.description}</Card.Text>
              <Card.Text><strong>Price:</strong> {event.price}</Card.Text>
              <Card.Text><strong>Tickets:</strong> {event.nbTickets}</Card.Text>
              <Card.Text><strong>Participants:</strong> {event.nbParticipants}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
