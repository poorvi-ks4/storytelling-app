import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  User, Play, BookOpen, Video, LogIn, Star, Clock
} from 'lucide-react';
import '../App.css';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storyCards, setStoryCards] = useState([]);
  const [videoCards, setVideoCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storyRes, videoRes] = await Promise.all([
          axios.get('http://localhost:7000/api/stories'),
          axios.get('http://localhost:7000/api/videos')
        ]);

        setStoryCards(storyRes.data);
        setVideoCards(videoRes.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    fetchData();
  }, []);

  return (
  
     <div className="storytime-app bg-light min-vh-100">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="navbar-brand d-flex align-items-center gap-2">
            <BookOpen size={28} />
            <span className="fw-bold fs-4">StoryTime</span>
            <span style={{ fontSize: '1.5rem' }}>📚</span>
          </div>
          <div>
            {!isLoggedIn ? (
              <button className="btn btn-light text-primary fw-semibold" onClick={() => navigate('/login')}>
                <LogIn size={16} className="me-1" /> Sign in
              </button>
            ) : (
              <button className="btn btn-outline-light fw-semibold">
                <User size={16} className="me-1" /> Profile
              </button>
            )}
          </div>
        </div>
      </nav>

     <div className="hero-section">
          <div className="hero-background"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          
          <div className="container py-5 text-center welcome-content">
            <h1 className="display-5 fw-bold text-white mb-4">
              <span className="emoji-float">🎉</span> Welcome to StoryTime! <span className="emoji-float">🎉</span>
            </h1>
            <p className="lead text-white mb-4" style={{ fontSize: '1.25rem' }}>
              Fun stories, videos, and learning for kids and families!
            </p>
            <div className="fs-2 text-white">
              <span className="emoji-float">📚</span>
              <span className="emoji-float">🎮</span>
              <span className="emoji-float">🎬</span>
              <span className="emoji-float">🎵</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container py-5">


      {/* Audio Stories */}
      <section className="container mb-5">
        <div className="section-title d-flex align-items-center gap-2 mb-3">
          <BookOpen size={24} className="text-primary" />
          <h4 className="mb-0 fw-bold">Audio Stories</h4>
          <span style={{ fontSize: '1.5rem' }}>🎧</span>
        </div>
        <div className="horizontal-scroll">
          {storyCards.map(story => (
            <div key={story._id} className="story-card rounded-4 shadow-sm bg-white p-3 me-3" style={{ minWidth: '220px' }}>
              <div className="text-center fs-1 mb-2">{story.image}</div>
              <h5 className="text-dark text-center fw-bold mb-2">{story.title}</h5>
              <div className="d-flex justify-content-between align-items-center text-muted small mb-2">
                <div className="d-flex gap-1 align-items-center"><Star size={14} /> {story.rating}</div>
                <div className="d-flex gap-1 align-items-center"><Clock size={14} /> {story.duration}</div>
              </div>
              <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center gap-2">
                <Play size={16} />
                Play Story
              </button>
              <div className="text-center mt-2 text-muted small">{story.plays} plays</div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Stories */}
      <section className="container mb-5">
        <div className="section-title d-flex align-items-center gap-2 mb-3">
          <Video size={24} style={{ color: '#f44336' }} />
          <h4 className="mb-0 fw-bold">Story Videos</h4>
          <span style={{ fontSize: '1.5rem' }}>🎬</span>
        </div>
        <div className="horizontal-scroll">
          {videoCards.map(video => (
            <div key={video._id} className="video-card rounded-4 bg-white shadow-sm p-3 me-3" style={{ minWidth: '240px' }}>
              <div className="video-thumbnail mb-2 text-center bg-secondary bg-opacity-10 rounded" style={{ height: '140px' }}>
                <span className="fs-1">{video.thumbnail}</span>
                <div className="duration-badge bg-dark text-white rounded-pill px-2 py-1 position-absolute top-0 end-0 m-2 small">{video.duration}</div>
              </div>
              <h5 className="text-dark fw-bold mb-2">{video.title}</h5>
              <small className="text-muted mb-3 d-block">{video.views} views</small>
              <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center gap-2 text-white">
                <Play size={16} />
                Watch Video
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
    </div>
  );
}

export default HomePage;
