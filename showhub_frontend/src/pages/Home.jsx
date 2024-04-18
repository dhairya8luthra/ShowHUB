import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import Card from '../components/ui/Card';
import axiosInstance from '../Auth/axios';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gridTemplateRows: '70vh',
          gap: '20vh',
          padding: '5rem',
          width: '100%',
        }}
      >
        {movies.map(movie => (
          <Card key={movie.id || `${movie.title}-${movie.genre}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}