DELIMITER //

CREATE PROCEDURE cancel_booking(IN p_bookingId INT)
BEGIN
    DELETE FROM bookings
    WHERE bookingId = p_bookingId;
END //

DELIMITER ;
