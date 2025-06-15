import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/games')
      .then(res => setGames(res.data))
      .catch(err => console.error('Error fetching games:', err));
  }, []);

  return (
    <div>
      <h2>🎮 Games</h2>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            <strong>{game.title}</strong> - {game.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
