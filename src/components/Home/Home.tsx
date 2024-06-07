import { Container, Row, Col } from "react-bootstrap";
import Type from "./Type";
import logo from "../assets/logo.png";

function Home() {
  return (
    <section>
      <Container className="home-section" id="home">
        <Container className="home-content">
          <Row className="home-row">
            <h1 className="heading">
              Your Buddy to Help You Hop Away from Nail-Biting
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}></div>
          </Row>

          <Row className="home-row">
            <div style={{ padding: 50, textAlign: "left" }}>
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
          </Row>

          <Row className="home-row">
            <div style={{ padding: 100, textAlign: "left" }}>
              <h1 style={{ paddingBottom: 1 }} className="heading">
                How am I Working
              </h1>
            </div>
            <div style={{ padding: 50, textAlign: "left" }}>
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
          </Row>

          <Row className="home-row">
            <div style={{ padding: 100, textAlign: "left" }}>
              <h1 style={{ paddingBottom: 1 }} className="heading">
                About my Creator
              </h1>
            </div>
            <div style={{ padding: 50, textAlign: "left" }}>
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
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
