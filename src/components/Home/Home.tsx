import { Container, Row, Col } from "react-bootstrap";
import HeroSection from "./Hero";
import how_img from "../../assets/how_is_it.svg";
function Home() {
  return (
    <>
      <HeroSection />
      <Container className="home-content">
        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: "flex", alignItems: "flex-start" }}>
              <div className="text-content">
                <h1 className="heading">What is NailGuard?</h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  Welcome! This <b>NailGuard</b> App can support you in
                  overcoming the habit of nail-biting. The detection system uses
                  deep learning technology to identify based on camera images
                  when you are biting your nails and provides gentle reminders
                  to help you break the habit.{" "}
                  <b>
                    Everything is calculated on your device; no data is sent to
                    a server!
                  </b>{" "}
                  Whether you're looking to improve your nail health, identify
                  stress, or simply stop this behavior, <b>NailGuard</b> is here
                  to assist you. Start your journey towards healthier nails
                  today!
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: "flex", alignItems: "flex-start" }}>
              <div className="text-content">
                <h1 className="heading">How is it working?</h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  <b>NailGuard</b> employs a detector that continuously analyzes
                  the input from your camera, searching for the positions of
                  your mouth and fingertips. By tracking these key points, it
                  can determine if your fingers are near or in contact with your
                  mouth, indicating nail-biting behavior. When such behavior is
                  detected, you will receive a gentle reminder to help you break
                  the habit. This process ensures that all calculations are done
                  locally on your device, maintaining your privacy and security.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="home-row">
            <Col style={{ textAlign: "center" }}>
              <img
                src={how_img}
                alt="description image"
                style={{ width: "100%", maxWidth: "600px", height: "auto" }}
              />
            </Col>
          </Row>
          <Row className="home-row">
            <Col md={12}>
              <div className="text-content">
                <p>
                  The key to this system's accuracy is a human keypoint
                  extractor based on deep learning. This technology uses
                  advanced neural networks to generate maps that highlight the
                  most likely positions of fingers, palms, and facial features
                  like lips. Trained on numerous labeled images, the system
                  learns to recognize these key points with high precision. When
                  an image is input, the model processes it and pinpoints the
                  exact locations of hand and mouth features. This deep learning
                  approach is particularly effective for applications such as
                  gesture recognition, sign language translation, and enhancing
                  facial expressions in augmented reality.
                </p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="home-row-container">
          <Row className="home-row">
            <Col md={4} style={{ display: "flex", alignItems: "flex-start" }}>
              <div className="text-content">
                <h1 className="heading">About the author</h1>
              </div>
            </Col>
            <Col md={8}>
              <div className="text-content">
                <p>
                  The system employs a detector that continuously analyzes the
                  input from your camera. It searches for the position of your
                  mouth and the fingertips. By tracking these key points, the
                  system can determine if your fingers are near or in contact
                  with your mouth, indicating nail-biting behavior. When such
                  behavior is detected, you will receive a gentle reminder to
                  help you break the habit. This process ensures that all
                  calculations are done locally on your device, maintaining your
                  privacy and security.
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
