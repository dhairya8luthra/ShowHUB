// Existing imports
import React, { useState, useEffect } from 'react';
import AdminNavbar from '../components/ui/AdminNavbar';
import { Button, SegmentedControl, Autocomplete } from '@mantine/core';
import axiosInstance from '../Auth/axios';
import classes from './GradientSegmentedControl.module.css';

export default function AdminHome() {
  const [selectedOption, setSelectedOption] = useState('');
  const [showMovieForm, setShowMovieForm] = useState(false);
  const [showAddTheatreForm, setShowAddTheatreForm] = useState(false);
  const [AddShowForm, setAddShowForm] = useState(false);
  const [deletemovieForm, setdeletemovieForm] = useState(false);
  const [deletetheatreForm, setdeletetheatreForm] = useState(false);
  const [deleteshowForm, setdeleteshowForm] = useState(false);
  const [deletescreenForm, setdeletescreenForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    actors: '',
    genre: '',
    trailer_link: '',
    releaseDate: '',
    posterLink: '',
    runningTime: '',
    createdAt: '',
    movieFormat: '',
  });
  const [formTheatreData, setFormTheatreData] = useState({
    theatrename: '',
    noofscreens: '',
    city:'',
    address:'',    
  });
  const [movieTitles, setMovieTitles] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovieTitles();
  }, []);

  const fetchMovieTitles = async () => {
    try {
      const response = await axiosInstance.get('/movies');
      const titles = response.data.map((movie) => movie.title);
      setMovieTitles(titles);
    } catch (error) {
      console.error('Error fetching movie titles:', error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowMovieForm(option === 'Add Movie' || option === 'Modify Movie');
    setShowAddTheatreForm(option === 'Add Theatre');
    setAddShowForm(option === 'Add Show');
    setdeletemovieForm(option === 'Delete Movie');
    setdeletetheatreForm(option === 'Delete Theatre');
    setdeleteshowForm(option === 'Delete Show');
    setdeletescreenForm(option === 'Delete Screen');
    setFormData({
      title: '',
      description: '',
      actors: '',
      genre: '',
      trailer_link: '',
      releaseDate: '',
      poster_link: '',
      running_time: '',
      movie_format: '',
    });
    setSelectedMovie(null);
  };

  const handleMovieSelect = async (title) => {
    try {
      const response = await axiosInstance.get(`/movies/${title}`);
      const movieData = response.data;
      setSelectedMovie(movieData);
      setFormData({
        title: movieData.title,
        description: movieData.description,
        actors: movieData.actors,
        genre: movieData.genre,
        trailerLink: movieData.trailer_link,
        releaseDate: movieData.release_date,
        posterLink: movieData.poster_link,
        runningTime: movieData.running_time,
        createdAt: movieData.createdat,
        movieFormat: movieData.movie_format,
      });
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTheatreInputChange = (e) => {
    const { name, value } = e.target;
    setFormTheatreData({
      ...formTheatreData,
      [name]: value,
    });
  };

  const handleAddMovie = async () => {
    try {
      const response = await axiosInstance.post('/addmovie', formData);
      console.log(response.data);
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error('Error adding movie:', error);
      // Handle error
    }
  };

  const handleUpdateMovie = async () => {
    try {
      console.log(selectedMovie.movieId);
      const response = await axiosInstance.put(`/movies/${selectedMovie.movieId}`, formData);
      console.log(response.data);
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error('Error updating movie:', error);
      // Handle error
    }
  };

  const handleAddTheatre = async () => {
    try {
      const response = await axiosInstance.post('/addtheatre', formTheatreData);
      console.log(formTheatreData)
      console.log(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding theatre:', error);
    }
  };

  const handleAddShow = async () => {
    try {
      const response = await axiosInstance.post('/addshow', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const handleDeleteMovie = async (title) => {
    try {
      // Display an alert to confirm before deleting
      const confirmDelete = window.confirm(`Are you sure you want to delete the movie "${title}"?`);
      if (!confirmDelete) return; // If user cancels, exit function
  
      const response = await axiosInstance.delete('/deletemovie', { data: { movieName: title } });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleDeleteTheatre = async () => {
    try {
      const response = await axiosInstance.post('/deletetheatre', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting theatre:', error);
    }
  };

  const handleDeleteShow = async () => {
    try {
      const response = await axiosInstance.post('/deleteshow', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  };

  const handleDeleteScreen = async () => {
    try {
      const response = await axiosInstance.post('/deletescreen', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting screen:', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminNavbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <SegmentedControl
          radius="xl"
          size="md"
          data={[
            'Add Movie',
            'Modify Movie',
            'Delete Movie',
            'Add Theatre',
            'Modify Theatre',
            'Delete Theatre',
            'Add Screen',
            'Modify Screen',
            'Delete Screen',
            'Add Show',
            'Modify Show',
            'Delete Show',
          ]}
          classNames={classes}
          onChange={handleOptionChange}
          value={selectedOption}
          style={{ marginBottom: '20px' }}
        />

        {showMovieForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            {selectedOption === 'Add Movie' && (
              <>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Title:
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    style={{ padding: '8px' }}
                  />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ padding: '8px' }}
                  ></textarea>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Actors:
                  <input type="text" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Genre:
                  <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Trailer Link:
                  <input type="text" name="trailerLink" value={formData.trailer_link} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Release Date:
                  <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Poster Link:
                  <input type="text" name="posterLink" value={formData.posterLink} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Running Time:
                  <input type="text" name="runningTime" value={formData.runningTime} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Created At:
                  <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Movie Format:
                  <input type="text" name="movieFormat" value={formData.movieFormat} onChange={handleInputChange} style={{ padding: '8px' }} />
                </label>
                <Button onClick={handleAddMovie} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
                  Add Movie
                </Button>
              </>
            )}
            {selectedOption === 'Modify Movie' && (
              <>
                <label style={{ display: 'flex', flexDirection: 'column' }}>
                  Select Movie:
                  <Autocomplete
                    data={movieTitles}
                    onChange={(value) => handleMovieSelect(value)}
                    style={{ padding: '8px' }}
                    placeholder="Select movie title"
                  />
                </label>
                {selectedMovie && (
                  <>
                    {/* Add fields for updating movie */}
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Title:
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Description:
                      <textarea name="description" value={formData.description} onChange={handleInputChange} style={{ padding: '8px' }}></textarea>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Actors:
                      <input type="text" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Genre:
                      <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Trailer Link:
                      <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Poster Link:
                      <input type="text" name="posterLink" value={formData.posterLink} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Running Time:
                      <input type="text" name="runningTime" value={formData.runningTime} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column' }}>
                      Movie Format:
                      <input type="text" name="movieFormat" value={formData.movieFormat} onChange={handleInputChange} style={{ padding: '8px' }} />
                    </label>
                    <Button onClick={handleUpdateMovie} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
                      Update Movie
                    </Button>
                  </>
                )}
              </>
            )}
            {selectedOption === 'Delete Movie' && (
              <label style={{ display: 'flex', flexDirection: 'column' }}>
                Select Movie:
                <Autocomplete
                  data={movieTitles}
                  onChange={(value) => handleDeleteMovie(value)}
                  style={{ padding: '8px' }}
                  placeholder="Select movie to delete"
                />
              </label>
            )}
          </form>
        )}

        {showAddTheatreForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              TheatreName:
              <input type="text" name="theatrename" value={formTheatreData.theatrename} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Number Of Screens:
              <input type="text" name="noofscreens" value={formTheatreData.nofscreens} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              City:
              <input type="text" name="city" value={formTheatreData.city} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Address:
              <input type="text" name="address" value={formTheatreData.address} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleAddTheatre} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Add Theatre
            </Button>
          </form>
        )}

        {AddShowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              MovieID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              StartingTime:
              <input type="time" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              EndTime:
              <input type="time" name="actors" value={formData.actors} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Price:
              <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              TheatreID:
              <input type="text" name="trailerLink" value={formData.trailerLink} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              ScreenID:
              <input type="text" name="releaseDate" value={formData.releaseDate} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              isActive:
              <input type="text" name="runningTime" value={formData.runningTime} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              DateOfShow:
              <input type="datetime-local" name="createdAt" value={formData.createdAt} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleAddShow} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Add Show
            </Button>
          </form>
        )}

        {deletemovieForm && (
              <label style={{ display: 'flex', flexDirection: 'column' }}>
                Select Movie:
                <Autocomplete
                  data={movieTitles}
                  onChange={(value) => handleDeleteMovie(value)}
                  style={{ padding: '8px' }}
                  placeholder="Select movie to delete"
                />
              </label>
            )}
        {deletetheatreForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Theatre ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleDeleteTheatre} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Theatre
            </Button>
          </form>
        )}
        {deleteshowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Show ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleDeleteShow} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Show
            </Button>
          </form>
        )}
        {deletescreenForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Screen ID:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleDeleteScreen} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Screen
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}