const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

    app.use(session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: new MySQLStore({
            host: 'localhost',
            port: 3306,
            user:'root',
            database: 'showhub'
    })),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(express.static('public'));
