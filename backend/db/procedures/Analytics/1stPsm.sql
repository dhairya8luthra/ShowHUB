DELIMITER //

CREATE PROCEDURE CalculateRevenue(IN movieTitle VARCHAR(255), IN theatreName VARCHAR(255), IN fromDate DATE, OUT revenue DECIMAL(10,2))
BEGIN
    SELECT SUM(b.totalPrice) INTO revenue
    FROM bookings b
    JOIN shows s ON b.showId = s.showId
    JOIN movies m ON s.movieId = m.movieid
    JOIN theatre t ON s.theatreId = t.TheatreID
    WHERE m.title = movieTitle AND t.TheatreName = theatreName AND b.created >= fromDate;
END //

DELIMITER ;