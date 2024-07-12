import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import logo from "../assets/logo.png";
import HeroSection from "./Hero";

function Home() {
  return (
    <>
      <HeroSection />
      <Container className="home-content">
        
        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="text-content">
                <h1 className="heading">
                  What is NailGuard?
                </h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  Welcome! I can support you in overcoming the habit of
                  nail-biting. My detection system uses deep learning technology
                  to identify based on camera images when you are biting your
                  nails and provides gentle reminders to help you break the habit.{" "}
                  <b>
                    Everything is calculated on your device; no data is sent to a
                    server!
                  </b>{" "}
                  Whether you're looking to improve your nail health, identify
                  stress, or simply stop this behavior, I'm here to assist you.
                  Start your journey towards healthier nails today!
                </p>
              </div>
            </Col>
          </Row>
        </div>
        
        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="text-content">
                <h1 className="heading">
                  How am I Working
                </h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  The system employs a detector that continuously analyzes the
                  input from your camera. It searches for the position of your
                  mouth and the fingertips. By tracking these key points, the
                  system can determine if your fingers are near or in contact with
                  your mouth, indicating nail-biting behavior. When such behavior
                  is detected, you will receive a gentle reminder to help you
                  break the habit. This process ensures that all calculations are
                  done locally on your device, maintaining your privacy and
                  security.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        
        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="text-content">
                <h1 className="heading">
                  About my Creator
                </h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  The system employs a detector that continuously analyzes the
                  input from your camera. It searches for the position of your
                  mouth and the fingertips. By tracking these key points, the
                  system can determine if your fingers are near or in contact with
                  your mouth, indicating nail-biting behavior. When such behavior
                  is detected, you will receive a gentle reminder to help you
                  break the habit. This process ensures that all calculations are
                  done locally on your device, maintaining your privacy and
                  security.
                </p>
              </div>
            </Col>
          </Row>
        </div>
        
      </Container>
    </>
  );
}

export default Home;