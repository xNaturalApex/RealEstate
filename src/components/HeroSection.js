import React from 'react'; // This is the main React library.
import '../App.css'; // This is the CSS file for the entire website.
import './HeroSection.css'; // This is the CSS file for this component.
import { useState, useEffect } from 'react'; // This is used to create states and use effects.
import { Button } from './Button'; // This is the button component.

// This is the HeroSection component.
function HeroSection() {
  const [video, setVideo] = useState(null);
  const slowMotionTime = 10;
  const slowerMotionTime = 15;
  const stopTime = 29;

  // This is a hook that runs the setVideo function when the page is loaded.
  useEffect(() => {
    const videoElement = document.getElementById('hero-video');
    setVideo(videoElement);
  }, []);

  // This is a hook that runs the handleTimeUpdate function when the video is updated.
  const handleTimeUpdate = () => {
    // Check if video is not null before using it
    if (!video) {
      return;
    }

    // Use optional chaining to simplify the code
    const currentTime = video?.currentTime;

    // Slow-motion for a brief point
    if (currentTime >= slowMotionTime && currentTime < slowMotionTime + 0.1) {
      video.playbackRate = 0.3;
    }
    // Even slower slow-motion for a brief point
    else if (
      currentTime >= slowerMotionTime &&
      currentTime < slowerMotionTime + 0.1
    ) {
      video.playbackRate = 0.1;
    } else {
      video.playbackRate = 0.6;
    }

    // Stop video at a specific point
    if (currentTime >= stopTime) {
      video.pause();
    }
  };

  return (
    <div className='hero-container'>
      <video
        controls={false}
        autoPlay
        muted
        id='hero-video'
        onTimeUpdate={handleTimeUpdate}
      >
        <source
          src='/videos/girl-texting.mp4'
          type='video/mp4'
        ></source>
      </video>
      <h1>REACH YOUR POTENTIAL.</h1>
      <p>Personalised Training for Optimal Results</p>
      <div className='hero-btns'>
        <Button
          className='btn'
          buttonStyle='btn--primary'
          buttonSize='btn--large btn--medium'
        >
          Schedule a Call{' '}
          <i
            className='fa-solid fa-phone'
            style={{
              background: 'linear-gradient(#9c47fc, #356ad2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          ></i>
        </Button>
        <Button
          className='btn'
          buttonStyle='btn--outline'
          buttonSize='btn--large btn--medium'
        >
          Learn More{' '}
          <i
            className='fa-solid fa-arrow-right'
            style={{
              background: 'linear-gradient(#9c47fc, #356ad2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          ></i>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
