import React, { useState, useEffect } from 'react';
import axiosInstance from '../Auth/axios';
import AdminNavbar from '../components/ui/AdminNavbar';

export default function Analytics() {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [lastNDays, setLastNDays] = useState(30);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [cities, setCities] = useState([]);
  const [analytics, setAnalytics] = useState({
    movieRevenue: 0,
    totalRevenue: 0,
    cityRevenue: 0,
  });
  const [showStats, setShowStats] = useState(false);

  const handleGetAnalytics = async () => {
    try {
      const movieRevenueResponse = await axiosInstance.get(`/analytics/movie/${encodeURIComponent(selectedMovie)}/${encodeURIComponent(selectedTheatre)}/${lastNDays}`);
      const totalRevenueResponse = await axiosInstance.get(`/analytics/total/${lastNDays}`);
      const cityRevenueResponse = await axiosInstance.get(`/analytics/city/${encodeURIComponent(selectedCity)}/${lastNDays}`);
      setAnalytics({
        movieRevenue: movieRevenueResponse.data.revenue || 0,
        totalRevenue: totalRevenueResponse.data.totalRevenue || 0,
        cityRevenue: cityRevenueResponse.data.cityRevenue || 0,
      });
      setShowStats(true);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const fetchTheatres = async () => {
      try {
        const response = await axiosInstance.get('/Theatres');
        setTheatres(response.data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await axiosInstance.get('/cities');
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchMovies();
    fetchTheatres();
    fetchCities();
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ flexDirection: 'column', marginTop: '2rem', alignItems: 'center', padding: '1rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Analytics</h2>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <select
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie.movieid} value={movie.title}>
                {movie.title}
              </option>
            ))}
          </select>
          <select
            value={selectedTheatre}
            onChange={(e) => setSelectedTheatre(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          >
            <option value="">Select a theatre</option>
            {theatres.map((theatre) => (
              <option key={theatre.TheatreID} value={theatre.TheatreName}>
                {theatre.TheatreName}
              </option>
            ))}
          </select>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          >
            <option value="">Select a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={lastNDays}
            onChange={(e) => setLastNDays(e.target.value)}
            placeholder="Last N days"
            min="1"
            style={{ marginRight: '0.5rem', padding: '0.5rem' }}
          />
          <button onClick={handleGetAnalytics}>Get Analytics</button>
        </div>
        {showStats && (
          <>
            {selectedMovie && selectedTheatre && (
              <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    Revenue from {selectedMovie} in {selectedTheatre} (last {lastNDays} days)
                  </span>
                  <span>Rs{analytics.movieRevenue.toFixed(2)}</span>
                </div>
              </div>
            )}
            {selectedCity && (
              <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold' }}>Total revenue from {selectedCity} (last {lastNDays} days)</span>
                  <span>Rs{analytics.cityRevenue.toFixed(2)}</span>
                </div>
              </div>
            )}
            {showStats && (
              <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold' }}>Total revenue (last {lastNDays} days)</span>
                  <span>Rs{analytics.totalRevenue.toFixed(2)}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
