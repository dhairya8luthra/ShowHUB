DELIMITER //
CREATE TRIGGER avoid_time_clash
BEFORE INSERT ON shows
FOR EACH ROW
BEGIN
    DECLARE clashExists INT;
    
    -- Check if there is a time clash with existing shows
    SELECT COUNT(*) INTO clashExists
    FROM shows
    WHERE date_of_movie = NEW.date_of_movie
    AND ((NEW.StartTiming BETWEEN StartTiming AND EndTime) OR (NEW.EndTime BETWEEN StartTiming AND EndTime))
    AND (NEW.ShowID != ShowID);

    -- If a time clash exists, prevent the insertion
    IF clashExists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Time clash detected with existing shows';
    END IF;
END //
DELIMITER ;
