DELIMITER //

CREATE PROCEDURE cancel_booking (
    IN p_bookingId INT
)
BEGIN
    DECLARE bookingExists INT;

    -- Check if the booking exists
    SELECT COUNT(*) INTO bookingExists FROM booking WHERE bookingid = p_bookingId;

    IF bookingExists > 0 THEN
        -- Delete the booking and associated tickets
        DELETE FROM booking WHERE bookingid = p_bookingId;
        DELETE FROM tickets WHERE booking_id = p_bookingId;
        SELECT 'Booking cancelled successfully' AS result;
    ELSE
        SELECT 'Booking does not exist' AS result;
    END IF;
END //

DELIMITER ;

-- Trigger to update the new insert value in the ticket table wrt class added

CREATE TRIGGER update_seatsclass ON Ticket
after INSERT
not for REPLICATION
AS
BEGIN
select top 1 inserted.Class from inserted
end

-- Trigger to show the new user when inserted in the Web_user table

CREATE TRIGGER update_usernames ON Web_user
after INSERT
not for REPLICATION
AS
BEGIN
select top 1 inserted.First_Name from inserted
end

--Trigger to check for underage users

CREATE TRIGGER check_users_age ON Web_user
after INSERT
not for REPLICATION
AS
declare @user_age int
BEGIN
select @user_age = i.Age from inserted i
IF (@user_age<13)
BEGIN
Print 'underage'
end
end

-- Trigger to update the number of seats left in gold and silver classes.

CREATE TRIGGER update_tickets_counter ON ticket
FOR INSERT
Not for REPLICATION
AS
BEGIN
declare @Gold int;
declare @Silver int;
declare @class1 varchar(3);
SELECT TOP 1 @class1 = i.class FROM INSERTED i
SELECT @Gold = Seats_Remaining_Gold from Show
where Show_ID = (Select Show_ID from Booking where Booking_ID = ( select top 1 Booking_ID from inserted))
SELECT @Silver = Seats_Remaining_Silver from Show
where Show_ID = (Select Show_ID from Booking where Booking_ID = ( select top 1 Booking_ID from inserted))
if @class1 = 'GLD'
BEGIN
IF @Gold = 0
   BEGIN
   PRINT 'All seats booked'
   END
   ELSE
   BEGIN
   UPDATE Show SET Seats_Remaining_Gold-=1 where show_id = (select show_id from Booking WHERE Booking_ID = (select top 1 Booking_ID from inserted))
   END
END
ELSE
BEGIN
   IF @Silver = 0
   BEGIN
   PRINT 'All seats booked'
   END
   ELSE
   Begin
   UPDATE Show set Seats_Remaining_Silver-=1 where show_id = (select show_id from Booking WHERE Booking_ID = (select top 1 Booking_ID from inserted))
   END
END
END
GO

DELIMITER //

CREATE TRIGGER check_availability
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE booked_seats INT;
    DECLARE total_seats INT;

    -- Get the number of booked seats for the show
    SELECT COUNT(*) INTO booked_seats FROM tickets WHERE show_id = NEW.show_id;

    -- Get the total seats available for the screen
    SELECT SeatsAvailable INTO total_seats FROM Screens WHERE ScreenID = (SELECT ScreenID FROM Shows WHERE ShowID = NEW.show_id);

    -- Check if there are available seats
    IF (booked_seats < total_seats) THEN
        -- Proceed with the insertion
        INSERT INTO tickets (seat_no, price, createdAt, show_id, booking_id) 
        VALUES (NEW.seat_no, NEW.price, NOW(), NEW.show_id, NEW.booking_id);
    ELSE
        -- Prevent the insertion or take appropriate action
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No available seats for this show';
    END IF;
END;
//

DELIMITER ;