import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Videos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/videos')
      .then(res => setVideos(res.data))
      .catch(err => console.error('Error fetching videos:', err));
  }, []);

  return (
    <div>
      <h2>🎬 Videos</h2>
      <ul>
        {videos.map(video => (
          <li key={video._id}>
            <strong>{video.title}</strong> - {video.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
