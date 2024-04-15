- Inserting dummy data into the user table
INSERT INTO user (userid, first_name, last_name, birthday, email, password, createdAt, phoneno) 
VALUES 
(1, 'John', 'Doe', '1990-05-15', 'john.doe@example.com', 'password123', NOW(), '1234567890'),
(2, 'Jane', 'Smith', '1985-08-20', 'jane.smith@example.com', 'qwerty456', NOW(), '9876543210'),
(3, 'Michael', 'Johnson', '1978-12-10', 'michael.j@example.com', 'passpass', NOW(), '5558889999');

-- Inserting dummy data into the booking table
INSERT INTO booking (bookingid, userid, noofseats, created, totalprice) 
VALUES 
(1, 1, 2, NOW(), 25),
(2, 2, 3, NOW(), 45),
(3, 3, 1, NOW(), 15);

-- Inserting dummy data into the movies table
INSERT INTO movies (movieId, title, description, actors, genre, trailer_link, release_date, poster_link, running_time, createdAT, active, movie_fromat) 
VALUES 
(1, 'The Matrix', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'Keanu Reeves, Laurence Fishburne', 'Action, Sci-Fi', 'https://www.youtube.com/watch?v=vKQi3bBA1y8', '1999-03-31', 'https://www.example.com/posters/the_matrix.jpg', '02:16:00', NOW(), 1, '2D'),
(2, 'Inception', 'A thief who enters the dreams of others to steal secrets from their subconscious.', 'Leonardo DiCaprio, Joseph Gordon-Levitt', 'Action, Adventure, Sci-Fi', 'https://www.youtube.com/watch?v=YoHD9XEInc0', '2010-07-16', 'https://www.example.com/posters/inception.jpg', '02:28:00', NOW(), 1, '2D'),
(3, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Tim Robbins, Morgan Freeman', 'Drama', 'https://www.youtube.com/watch?v=6hB3S9bIaco', '1994-10-14', 'https://www.example.com/posters/shawshank_redemption.jpg', '02:22:00', NOW(), 1, '2D');

-- Inserting dummy data into the Screens table
INSERT INTO Screens (ScreenID, SeatsAvailable, TheatreID, Admin_Last_Updated) 
VALUES 
(1, 100, 1, NOW()),
(2, 120, 1, NOW()),
(3, 80, 2, NOW());

-- Inserting dummy data into the Theatre table
INSERT INTO Theatre (TheatreID, NoOfScreens, TheatreName, Admin_Last_Updated) 
VALUES 
(1, 2, 'Cineplex Central', NOW()),
(2, 1, 'Regal Cinemas', NOW());





INSERT INTO Shows (ShowID, MovieID, StartTiming, EndTime, Price, TheatreID, ScreenID) 
VALUES 
(1, 1, '10:00:00', '12:16:00', 10, 1, 1),
(2, 2, '12:30:00', '15:00:00', 12, 1, 2),
(3, 3, '14:00:00', '16:22:00', 8, 2, 1);

-- Inserting dummy data into the Movie_actors table
INSERT INTO Movie_actors (MovieID, Actor_Name) 
VALUES 
(1, 'Keanu Reeves'),
(1, 'Laurence Fishburne'),
(2, 'Leonardo DiCaprio'),
(2, 'Joseph Gordon-Levitt'),
(3, 'Tim Robbins'),
(3, 'Morgan Freeman');

-- Inserting dummy data into the Movie_directors table
INSERT INTO Movie_directors (MovieID, Director_Name) 
VALUES 
(1, 'Lana Wachowski'),
(1, 'Lilly Wachowski'),
(2, 'Christopher Nolan'),
(3, 'Frank Darabont');

-- Inserting dummy data into the Movie_genres table
INSERT INTO Movie_genres (MovieID, Genre) 
VALUES 
(1, 'Action'),
(1, 'Sci-Fi'),
(2, 'Action'),
(2, 'Adventure'),
(2, 'Sci-Fi'),
(3, 'Drama');

-- Inserting dummy data into the seat table
INSERT INTO seat (seat_no, is_booked, screenID) 
VALUES 
(1, FALSE, 1),
(2, FALSE, 1),
(3, FALSE, 1),
(4, TRUE, 2),
(5, FALSE, 2);

-- Inserting dummy data into the tickets table
INSERT INTO tickets (seat_no, price, createdAt, show_id, booking_id) 
VALUES 
(1, 10, NOW(), 1, 1),
(2, 10, NOW(), 1, 1),
(3, 12, NOW(), 2, 2),
(4, 12, NOW(), 2, 2),
(5, 8, NOW(), 3, 3);

-- Inserting dummy data into the admin table
INSERT INTO admin (admin_id, full_name, birthday, email, password) 
VALUES 
(1, 'Admin User', '1980-01-01', 'admin@example.com', 'adminpass');
