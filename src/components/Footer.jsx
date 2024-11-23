import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa'; 

function Footer() {
  return (
    <Container fluid className="footer">
      <Row className="d-flex align-items-center justify-content-between">
        <Col xs="auto">
          <p>&copy; 2024 HAMADA TAHA. All Rights Reserved.</p>
        </Col>

        <Col xs="auto">
          <Nav className="footer-nav">
            <Nav.Link href="https://github.com/Hamadataha90" target="_blank">
              <FaGithub /> GitHub
            </Nav.Link>
            <Nav.Link href="https://www.linkedin.com/in/hamada-elsayed-90h2011/" target="_blank">
              <FaLinkedin /> LinkedIn
            </Nav.Link>
            <Nav.Link href="https://hamada-portfolio.vercel.app/" target="_blank">
              <FaExternalLinkAlt /> Portfolio
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
