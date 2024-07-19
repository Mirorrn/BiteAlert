import { useRef, useState, useEffect } from "react";
import video from "../../assets/hero.webm";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const navigateToAbout = () => {
    navigate("/detection");
  };

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateProgress = () => {
    const video = videoRef?.current;
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateProgress);
      return () => {
        video.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, []);

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
              <CiPlay1 style={{ marginBottom: "5px" }} className="mr-2" /> Get Started
            </button>
          </div>
          <div className="col-md-6 video-container">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              className="background-video rounded-video"
            >
              <source src={video} type="video/webm" />
              Your browser does not support the video tag.
            </video>
            <div className="video-controls">
              <button
                className="btn btn-transparent"
                onClick={toggleVideoPlayback}
              >
                <div className="progress-ring-container">
                  <svg className="progress-ring" width="70" height="70">
                    <circle
                      className="progress-ring__circle"
                      stroke="white"
                      strokeWidth="4"
                      fill="transparent"
                      r="30"
                      cx="35"
                      cy="35"
                      style={{
                        strokeDasharray: `${2 * Math.PI * 30}`,
                        strokeDashoffset: `${
                          2 * Math.PI * 30 - (progress / 100) * 2 * Math.PI * 30
                        }`,
                      }}
                    />
                  </svg>
                  <div className="play-pause-icon">
                    {isPlaying ? (
                      <CiPause1 size={30} />
                    ) : (
                      <CiPlay1 size={30} />
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;