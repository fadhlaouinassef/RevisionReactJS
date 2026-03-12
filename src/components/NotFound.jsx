import React from 'react';
import { Container } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container className="text-center mt-5">
      <h1 className="mb-4">404 - Page Not Found</h1>
      <img 
        src="/images/notfound.jfif" 
        alt="Not Found" 
        className="img-fluid"
      />
    </Container>
  );
}
