import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Card from '../components/ui/Card';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div>
        Please select seat
      </div>
    </div>
  );
}
