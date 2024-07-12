import React from "react";
import video from "../../assets/hero.webm";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate("/detection");
  };

  return (
    <div className="hero-section">
      <Container className="hero-card">
        <div className="row w-100">
          <div className="col-md-6 text-container">
            <h1 className="display-4 font-weight-bold">
              Let’s Fight Together Against the Nail Biting Habit!
            </h1>
            <p className="lead">
              We are not weak, we care about stuff! This AI-based app can help
              us detect and alert if we are biting our nails.
            </p>
            <div className="tags">
              <span className="tag">AI</span>
              <span className="tag">On Device</span>
              <span className="tag">Secure</span>
            </div>
            <button className="btn btn-primary mt-3" onClick={navigateToAbout}>
              <AiOutlinePlayCircle className="mr-2" /> Get Started
            </button>
          </div>
          <div className="col-md-6 video-container">
            <video
              autoPlay
              loop
              muted
              className="background-video rounded-video"
            >
              <source src={video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;