import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
import { Autocomplete, Button } from '@mantine/core';
import TableComp from '../components/ui/TableComp';
import './MovieDetails.css';

export default function MovieDetails() {
  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [city_selected, setCity] = useState('');
  const [theatres, setTheatres] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/movies/${encodeURIComponent(movieName)}`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieName]);

  useEffect(() => {
    fetch('http://localhost:3001/cities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  const handleSubmitCity = () => {
    fetch(`http://localhost:3001/movies/${encodeURIComponent(movieName)}/theatres/${encodeURIComponent(city_selected)}`)
      .then(response => response.json())
      .then(data => setTheatres(data))
      .catch(error => console.error('Error fetching theatres:', error));
  };

    return (
      <div style={{ display: 'flex' }}>
        <Navbar />
        {movieDetails && cities ? (
          <div className='container'>
            <img
              src={movieDetails.poster_link}
              alt={movieDetails.title}
              className='poster'
            />
            <h1 className='headings'>{movieDetails.title}</h1>
            <p className='statement'>{movieDetails.description}</p>
            <br></br>
            <h2 className='headings'>Cast:</h2>
            <p className='statement'>{movieDetails.actors}</p>
            <br></br>
            <h2 className='headings'>YouTube Trailer</h2>
            <br></br>
            <iframe
              width="800"
              height="500"
              src={movieDetails?.trailer_link}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className='embed'
            ></iframe>
            <br></br>
            {cities && (
              <>
                <h2 className='headings'>City</h2>
                <Autocomplete
                  className='auto'
                  placeholder="Select a city"
                  value={city_selected}
                  data={cities}
                  onChange={setCity}
                />
                <button className="btn">
                  Select<span aria-hidden></span>
                  <span aria-hidden class="btn__glitch"></span>
                  <span aria-hidden class="btn__tag"></span>
                </button>
              </>
            )}
            <TableComp moviename={movieName} city_selected={city_selected} />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }