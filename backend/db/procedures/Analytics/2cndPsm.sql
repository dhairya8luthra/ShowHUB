DELIMITER //

CREATE PROCEDURE CalculateTotalRevenue(IN fromDate DATE, OUT totalRevenue DECIMAL(10,2))
BEGIN
    SELECT SUM(totalPrice) INTO totalRevenue
    FROM bookings
    WHERE created >= fromDate;
END //

DELIMITER ;