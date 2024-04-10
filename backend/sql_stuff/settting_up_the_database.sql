create database showhub;
show databases;
use showhub;
#dhairya

#user_table
create table user( 
userid int,
first_name varchar(250),
last_name varchar(250),
birthday date,
email varchar(150),
password varchar(250) NOT NULL,
createdAt datetime,
phoneno varchar(10),
primary key (userid));
#bookings
create table booking(
bookingid int,
userid int,
noofseats int,
created datetime,
totalprice int);
ALTER TABLE booking
ADD primary key (bookingid);

ALTER table booking
ADD FOREIGN KEY (userid)
references user(userid);

#
create table movies(movieId int,
title varchar(300),
description LONGTEXT,
actors varchar(500),
genre varchar(500),
trailer_link LONGTEXT,
release_date DATE,
poster_link LONGTEXT,
running_time TIME,
createdAT TIME,
active BOOLEAN,
movie_format varchar(100),
primary key(movieId),
);

 
#

create table Screens(
ScreenID int primary key,
SeatsAvailable int, 
TheatreID  int,
Admin_Last_Updated date, 
);

create table Theatre(
TheatreID int primary key,
NoOfScreens int, 
TheatreName varchar(100),
TheatreID varchar(100),
Admin_Last_Updated date,  
);

create table Shows(
ShowID int primary key,
MovieID int,
StartTiming time, 
EndTime time, 
Price int,
TheatreID int,
ScreenID int,
Admin_Last_Updated date,  
);

create table Movie_actors(
    MovieID int,
    Actor_Name varchar(100),
    primary key (MovieID),
);

create table Movie_directors(
    MovieID int,
    Director_Name varchar(100),
    primary key(MovieId),
);
create table Movie_genres(MovieID int,
Genre varchar,
  primary key(MovieId),

);

create table seat(

    seat_no int,
    is_booked BOOLEAN,
    screenID int,
    primary key (seat_no)

);

create table tickets(

    seat_no int,
    price int,
    createdAt datetime,
    show_id int,
    booking_id int,
    primary key (seat_no)

);

create table admin(

    admin_id int,
    full_name varchar(250),
    birthday datetime,
    email varchar(250),
    password varchar(250),
    primary key (admin_id)

);