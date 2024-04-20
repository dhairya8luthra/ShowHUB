DELIMITER //

CREATE PROCEDURE GetUserBookingsByEmail (IN userEmail VARCHAR(255))
BEGIN
    SELECT bookingId, showId, noofseats, totalPrice, movieName, created
    FROM bookings
    WHERE userId = (
        SELECT userid FROM user WHERE email = userEmail
    )
    ORDER BY created DESC;
END //

DELIMITER ;