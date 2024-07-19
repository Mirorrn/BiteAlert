import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="4" className="footer-copywright">
            <h3>Designed and Developed by Martin Moder</h3>
          </Col>
          <Col md="4" className="footer-copywright">
            <h3>Copyright © {year} NailGuard</h3>
          </Col>
          <Col md="4" className="footer-body">
            <ul className="footer-icons d-flex justify-content-center">
              <li className="social-icons">
                <a
                  href="https://github.com/Mirorrn/NailGuard"
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/martin-moder-5ab290108/"
                  style={{ color: "black" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
