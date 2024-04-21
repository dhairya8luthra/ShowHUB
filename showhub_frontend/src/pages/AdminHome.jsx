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
  const [showAddScreenForm, setshowAddScreenForm] = useState(false);
  const [deletescreenForm, setdeletescreenForm] = useState(false);
  const [modifyshowForm,setmodifyshowForm] = useState(false);

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
    city: '',
    address: '',
  });
  const [formScreenData, setFormScreenData] = useState({
    screenid: '',
    theatreid: '',
    seatsavailable: '',})
    const [formShowData, setShowFormData] = useState({
      screenid: '',
      theatreid: '',
      showid:'',
      starttime:'',
      endtime:'',
      price:'',
      isactive:'',
      date:'',
      movieid:''
    })
    
  
  


  const [movieTitles, setMovieTitles] = useState([]);
  const [TheatreTitles, setTheatreTitles] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetchMovieTitles();
    fetchTheatreTitles();
  }, [],[]);

  const fetchMovieTitles = async () => {
    try {
      const response = await axiosInstance.get('/movies');
      console.log(response.data);
      const titles = response.data.map((movie) => movie.title);
      setMovieTitles(titles);
      console.log(titles);
    } catch (error) {
      console.error('Error fetching movie titles:', error);
    }
  };

  const fetchTheatreTitles = async () => {
    try {
      const response = await axiosInstance.get('/Theatres');
      const TheatreTitles = response.data.map((theatre) => theatre.TheatreName);
      console.log(response.data);
      setTheatreTitles(TheatreTitles);
      console.log(TheatreTitles);
    } catch (error) {
      console.error('Error fetching theatre titles:', error);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowMovieForm(option === 'Add Movie' || option === 'Modify Movie');
    setShowAddTheatreForm(option === 'Add Theatre' || option === 'Modify Theatre');
    setAddShowForm(option === 'Add Show');
    setshowAddScreenForm(option === 'Add Screen');
    setdeletemovieForm(option === 'Delete Movie');
    setdeletetheatreForm(option === 'Delete Theatre');
    setdeleteshowForm(option === 'Delete Show');
    setdeletescreenForm(option === 'Delete Screen');
    setmodifyshowForm(option === 'Modify Show'); 

  
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
    setFormTheatreData({
      theatrename: '',
      noofscreens: '',
      city: '',
      address: '',
    });
    setFormScreenData({
        screenid: '',
        theatreid: '',
        seatsavailable: '',
        
      });
      setShowFormData({
        screenid: '',
        theatreid: '',
        showid:'',
        starttime:'',
        endtime:'',
        price:'',
        isactive:'',
        date:'',
        movieid:''
      });
    
    setSelectedMovie(null);
    setSelectedTheatre(null);
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

  const handleTheatreSelect = async (theatrename) => {
    try {
      const response = await axiosInstance.get(`/Theatres/${theatrename}`);
      const theatreData = response.data;
      setSelectedTheatre(theatreData);
      setFormTheatreData({
        theatrename: theatreData.TheatreName,
        noofscreens: theatreData.NoOfScreens,
        city: theatreData.city,
        address: theatreData.address,
      });
    } catch (error) {
      console.error('Error fetching theatre details:', error);
    }
  };
  const handleSelectScreen = async (screenID) => {
    try {
      const response = await axiosInstance.get(`/screens/${screenID}`);
      const screenData = response.data;
      setSelectedScreen(screenData);
      setFormScreenData({
        screenid: screenData.screenID,
        theatreid: screenData.theatreID,
        seatsavailable: screenData.seatsAvailable.toString(), // Convert seatsAvailable to string
      });
    } catch (error) {
      console.error('Error fetching screen details:', error);
    }
  };

  const handleUpdateScreen = async () => {
    try {
      const response = await axiosInstance.put(`/screens/${selectedScreen.screenid}`, {
        seatsavailable: formScreenData.seatsavailable,
      });
      console.log('Screen updated successfully:', response.data);
      // Optionally, you can handle UI updates or show a success message here
    } catch (error) {
      console.error('Error updating screen:', error);
      // Optionally, you can handle errors and show an error message here
    }
  };
  
  
  const handleDeleteScreen = async () => {
    try {
      // Get the value from the input field
      const screenID = formScreenData.screenid;
  
      // Display an alert to confirm before deleting
      const confirmDelete = window.confirm(`Are you sure you want to delete the screen with ID "${screenID}"?`);
      if (!confirmDelete) return; // If user cancels, exit function
  
      // Send the DELETE request with screenID as a route parameter
      const response = await axiosInstance.delete(`/deletescreen/${screenID}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting screen:', error);
    }
  };

 

  const handleShowSelect = async (showId) => {
    try {
      
      setSelectedShow(formShowData);
      // Update form data with show details
      setShowFormData({
        showid: formShowData.showid,
        starttime: formShowData.starttime,
        endtime: formShowData.endtime,
        price: formShowData.price,
        currentstatus: formShowData.currentstatus,
        date: formShowData.date,
        runningTime: formShowData.runningTime,
      });
    } catch (error) {
      console.error('Error fetching show details:', error);
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
  const handleScreenInputChange = (e) => {
    const { name, value } = e.target;
    setFormScreenData({
      ...formScreenData,
      [name]: value,
    });
  };
  const handleShowInputChange = (e) => {
    const { name, value } = e.target;
    setShowFormData((formShowData) => ({
      ...formShowData,
      [name]: value,
    }));
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
  const handleAddScreen = async () => {
    try {
        console.log(formScreenData);
      const response = await axiosInstance.post('/addscreen', formScreenData);
      console.log(response.data);
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error('Error adding screen:', error);
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
      console.log(formTheatreData);
      console.log(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding theatre:', error);
    }
  };
  

  const handleUpdateTheatre = async () => {
    try {
      const response = await axiosInstance.put(`/updateTheatre/${selectedTheatre.TheatreID}`, formTheatreData);
      console.log(response.data);
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error('Error updating theatre:', error);
      // Handle error
    }
  };
  const handleAddShow = async () => {
    try {
      const response = await axiosInstance.post('/addshow', formShowData);
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
      const response = await axiosInstance.delete('/deletetheatre', { data: { theatreID: selectedTheatre.TheatreID } });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting theatre:', error);
    }
  };

  const handleUpdateShow = async () => {
    try {
      const response = await axiosInstance.post('/updateshow',{
        showID: formShowData.showid,
        movieID: formShowData.movieid,
        starttime:formShowData.starttime,
        endtime:formShowData.endtime,
        price: formShowData.price,
        theatreid:formShowData.theatreid,
        screenid:formShowData.screenid,
        isactive:formShowData.isactive,
        date:formShowData.date
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating show:', error);
    }
  }


  const handleDeleteShow = async () => {
    try {
      const response = await axiosInstance.post('/deleteshow', { showID: formData.showID });
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting show:', error);
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
    {selectedOption === 'Add Theatre' && (
      <>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          TheatreName:
          <input type="text" name="theatrename" value={formTheatreData.theatrename} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Number Of Screens:
          <input type="text" name="noofscreens" value={formTheatreData.noofscreens} onChange={handleTheatreInputChange} style={{ padding: '8px' }} />
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
      </>
    )}
              {selectedOption === 'Modify Theatre' && (
  <>
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      Select Theatre:
      <Autocomplete
        data={TheatreTitles}
        onChange={(value) => handleTheatreSelect(value)}
        style={{ padding: '8px' }}
        placeholder="Select theatre name"
      />
    </label>
    {selectedTheatre && (
      <>
        {/* Modify Theatre form fields */}
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Theatre Name:
          <input
            type="text"
            name="theatrename"
            value={formTheatreData.theatrename} // Update this line
            onChange={handleTheatreInputChange}
            style={{ padding: '8px' }}
            placeholder="Theatre Name"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Number of Screens:
          <input
            type="text"
            name="noofscreens"
            value={formTheatreData.noofscreens} // Update this line
            onChange={handleTheatreInputChange}
            style={{ padding: '8px' }}
            placeholder="Number of Screens"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          City:
          <input
            type="text"
            name="city"
            value={formTheatreData.city} // Update this line
            onChange={handleTheatreInputChange}
            style={{ padding: '8px' }}
            placeholder="City"
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Address:
          <input
            type="text"
            name="address"
            value={formTheatreData.address} // Update this line
            onChange={handleTheatreInputChange}
            style={{ padding: '8px' }}
            placeholder="Address"
          />
        </label>
        <Button onClick={handleUpdateTheatre} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
          Update Theatre
        </Button>
      </>
    )}
  </>
)}
  </form>
)}
{showAddScreenForm && selectedOption === 'Add Screen' && (
  <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      Screen ID:
      <input type="text" name="screenid" value={formScreenData.screenid} onChange={handleScreenInputChange} style={{ padding: '8px' }} />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      Theatre ID:
      <input type="text" name="theatreid" value={formScreenData.theatreid} onChange={handleScreenInputChange} style={{ padding: '8px' }} />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      Seats Available:
      <input type="text" name="seatsavailable" value={formScreenData.seatsavailable} onChange={handleScreenInputChange} style={{ padding: '8px' }} />
    </label>
    <Button onClick={handleAddScreen} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
      Add Screen
    </Button>
  </form>
)}

{selectedOption === 'Modify Screen' && (
  <>
      <label style={{ display: 'flex', flexDirection: 'column' }}>
          Screen ID:
          <input
            type="text"
            name="screenid"
            style={{ padding: '8px' }}
            placeholder="Enter Screen ID"
            value={selectedScreen.screenid}
            onChange={(e) => setSelectedScreen({ ...selectedScreen, screenid: e.target.value })}
          />
    </label>
    
    <label style={{ display: 'flex', flexDirection: 'column' }}>
      Updated Seats Available:
      <input
        type="text"
        name="seatsavailable"
        style={{ padding: '8px' }}
        placeholder="Enter Updated Seats Available"
        value={formScreenData.seatsavailable}
        onChange={(e) => setFormScreenData({ ...formScreenData, seatsavailable: e.target.value })}
      />
    </label>
    <Button
      onClick={handleUpdateScreen}
      color="#fdc500"
      style={{ alignSelf: 'flex-start' }}
    >
      Update Screen
    </Button>
  </>
)}



{selectedOption === 'Delete Screen' && (
  <label style={{ display: 'flex', flexDirection: 'column' }}>
    Screen ID:
    <input
  type="text"
  name="screenid"
  value={formScreenData.screenid}
  onChange={handleScreenInputChange}
  style={{ padding: '8px' , margin: '10px'}}
  placeholder="Enter Screen ID"
/>

    <Button
      onClick={handleDeleteScreen}
      color="#fdc500"
      style={{ alignSelf: 'flex-start' ,margin: '8px'}}
    >
      Delete Screen
    </Button>
  </label>
  
)}
        {AddShowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
           <label style={{ display: 'flex', flexDirection: 'column' }}>
  MovieID:
  <input type="text" name="movieid" value={formShowData.movieid} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  StartingTime:
  <input type="time" name="starttime" value={formShowData.starttime} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  EndTime:
  <input type="time" name="endtime" value={formShowData.endtime} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  Price:
  <input type="text" name="price" value={formShowData.price} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  TheatreID:
  <input type="text" name="theatreid" value={formShowData.theatreid} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  ScreenID:
  <input type="text" name="screenid" value={formShowData.screenid} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  isActive:
  <input type="text" name="isactive" value={formShowData.isactive} onChange={handleShowInputChange} style={{ padding: '8px' }} />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  DateOfShow:
  <input type="datetime-local" name="date" value={formShowData.date} onChange={handleShowInputChange} style={{ padding: '8px' }} />
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
              Select Theatre:
              <Autocomplete
                data={TheatreTitles}
                onChange={(value) => handleTheatreSelect(value)}
                style={{ padding: '8px' }}
                placeholder="Select theatre name"
              />
            </label>
            {selectedTheatre && (
              <>
                <Button onClick={handleDeleteTheatre} color="#dc3545" style={{ alignSelf: 'flex-start' }}>
                  Delete Theatre
                </Button>
              </>
            )}
          </form>
        )}

        {deleteshowForm && (
          <form style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' }}>
            <label style={{ display: 'flex', flexDirection: 'column' }}>
              Show ID:
              <input type="text" name="showID" value={formData.showID} onChange={handleInputChange} style={{ padding: '8px' }} />
            </label>
            <Button onClick={handleDeleteShow} color="#fdc500" style={{ alignSelf: 'flex-start' }}>
              Delete Show
            </Button>
          </form>
        )}
        
    {modifyshowForm && selectedOption === 'Modify Show' && (
      <>
      <label style={{ display: 'flex', flexDirection: 'column' }}>
  ShowID:
  <input
    name='showid' // Corrected name attribute
    value={formShowData.showid}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  MovieID:
  <input
    name='movieid'
    value={formShowData.movieid}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  Starting Time:
  <input
    name='starttime'
    type='time'
    value={formShowData.starttime}
    onChange={handleShowInputChange}
    style={{ padding: '8px', width:'210px'}}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  End Time:
  <input
    name='endtime'
    type='time'
    value={formShowData.endtime}
    onChange={handleShowInputChange}
    style={{ padding: '8px', width:'210px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  Price:
  <input
    name='price'
    value={formShowData.price}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  TheatreID:
  <input
    name='theatreid'
    value={formShowData.theatreid}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  ScreenID:
  <input
    name='screenid'
    value={formShowData.screenid}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  Activity Status:
  <input
    name='isactive'
    value={formShowData.isactive}
    onChange={handleShowInputChange}
    style={{ padding: '8px' }}
    placeholder="Select show"
  />
</label>
<label style={{ display: 'flex', flexDirection: 'column' }}>
  Date:
  <input
    name='date'
    type='date'
    value={formShowData.date}
    onChange={handleShowInputChange}
    style={{ padding: '8px',width:'210px' }}
    placeholder="Select show"
  />
</label>

      <Button onClick={handleUpdateShow} color="#fdc500" style={{ alignSelf: 'flex-start', left:'615px',margin:'25px' }}>
                Update Show
      </Button>
      </>
  )}
    
      </div>
    </div>
  );
}