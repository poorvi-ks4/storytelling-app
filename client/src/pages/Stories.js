import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/stories')
      .then(res => setStories(res.data))
      .catch(err => console.error('Error loading stories:', err));
  }, []);

  return (
    <div>
      <h2>📚 Stories</h2>
      <ul>
        {stories.map(story => (
          <li key={story._id}>{story.title}</li>
        ))}
      </ul>
    </div>
  );
}
