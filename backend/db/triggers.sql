CREATE TRIGGER update_usernames ON Web_user
after INSERT
not for REPLICATION
AS
BEGIN
select top 1 inserted.First_Name from inserted
end

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

DELIMITER //

CREATE TRIGGER check_user_age_before_insert
BEFORE INSERT ON tickets
FOR EACH ROW
BEGIN
    DECLARE user_dob DATE;
    DECLARE user_age INT;
    DECLARE booking_userid INT;

    -- Get the user's date of birth from the user table using the booking userid
    SELECT birthday INTO user_dob FROM user WHERE userid = (SELECT userid FROM booking WHERE booking_id = NEW.booking_id);

    -- Calculate the age of the user
    SET user_age = TIMESTAMPDIFF(YEAR, user_dob, CURDATE());

    -- Check if the user is underage
    IF user_age < 18 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User is underage';
    END IF;
END;
//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE CalculateMonthlyRevenue (IN theater_id INT, OUT monthly_revenue DECIMAL(10, 2))
BEGIN
    DECLARE start_date DATE;
    DECLARE end_date DATE;
    
    -- Get the start and end dates of the current month
    SET start_date = DATE_FORMAT(NOW(), '%Y-%m-01');
    SET end_date = LAST_DAY(NOW());
    
    -- Calculate the total revenue for the current month for the given theater
    SELECT SUM(totalprice) INTO monthly_revenue
    FROM booking b
    INNER JOIN tickets t ON b.bookingid = t.booking_id
    INNER JOIN screens s ON t.show_id = s.ScreenID
    WHERE s.TheatreID = theater_id
    AND b.created BETWEEN start_date AND end_date;
END//

DELIMITER ;