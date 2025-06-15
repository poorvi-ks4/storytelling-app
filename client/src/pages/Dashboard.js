import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:7000/api/progress/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setStats(res.data))
      .catch(err => console.error('Dashboard fetch error:', err));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>📊 Parent Dashboard</h2>
      <p>Total Stories: {stats.totalStories}</p>
      <p>Total Games: {stats.totalGames}</p>
      <p>Total Videos: {stats.totalVideos}</p>
      <p>Total Child Users: {stats.totalUsers}</p>

      <h3>📈 Recent Progress</h3>
      <ul>
        {stats.recentProgress.map((p, i) => (
          <li key={i}>
            {p.userId?.username} completed {p.storyId?.title || p.videoId?.title || p.gameId?.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
