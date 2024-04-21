DELIMITER $$
CREATE TRIGGER prevent_cancellation_before_show
BEFORE DELETE ON bookings
FOR EACH ROW
BEGIN
    DECLARE show_start_datetime DATETIME;
    DECLARE cancellation_cutoff_datetime DATETIME;
    DECLARE cutoff_duration INT; -- in minutes

    SET cutoff_duration = 1; -- Set the desired cutoff duration (e.g., 60 minutes before the show)

    -- Get the start date and time of the show
    SELECT CONCAT(date_of_movie, ' ', StartTiming) INTO show_start_datetime
    FROM shows
    WHERE ShowID = OLD.showid;

    -- Calculate the cancellation cutoff datetime
    SET cancellation_cutoff_datetime = DATE_SUB(show_start_datetime, INTERVAL cutoff_duration MINUTE);

    -- Check if the current datetime is within the cancellation cutoff period
    IF CURRENT_TIMESTAMP() >= cancellation_cutoff_datetime THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cancellation not allowed within the cutoff period before the show.';
    END IF;
END$$
DELIMITER ;