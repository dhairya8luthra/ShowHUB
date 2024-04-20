DELIMITER //

CREATE PROCEDURE GetTheatresByMovieAndCity (IN movieTitle VARCHAR(255), IN cityName VARCHAR(255))
BEGIN
    SELECT t.*
    FROM theatre t
    INNER JOIN shows s ON t.TheatreID = s.TheatreID
    INNER JOIN movies m ON s.MovieID = m.movieId
    WHERE m.title = movieTitle AND t.city = cityName;
END //

DELIMITER ;