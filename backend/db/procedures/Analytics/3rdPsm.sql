DELIMITER //

CREATE PROCEDURE CalculateCityRevenue(IN cityName VARCHAR(255), IN fromDate DATE, OUT cityRevenue DECIMAL(10,2))
BEGIN
    SELECT SUM(b.totalPrice) INTO cityRevenue
    FROM bookings b
    JOIN shows s ON b.showId = s.showId
    JOIN theatre t ON s.theatreId = t.TheatreID
    WHERE t.city = cityName AND b.created >= fromDate;
END //

DELIMITER ;
