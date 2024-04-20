DELIMITER $$
CREATE TRIGGER update_show_status
AFTER UPDATE ON seat
FOR EACH ROW
BEGIN
    DECLARE total_seats INT;
    DECLARE booked_seats INT;

    -- Get the total number of seats for the show
    SELECT COUNT(*) INTO total_seats
    FROM seat
    WHERE showid = NEW.showid;

    -- Get the number of booked seats for the show
    SELECT COUNT(*) INTO booked_seats
    FROM seat
    WHERE showid = NEW.showid AND is_booked = 1;

    -- If all seats are booked, set isActive to 0 for the corresponding show
    IF booked_seats = total_seats THEN
        UPDATE shows
        SET isActive = 0
        WHERE ShowID = NEW.showid;
    END IF;
END$$
DELIMITER ;