'use strict';
const nodemailer = require('nodemailer');
const express = require('express');
const validator = require("email-validator");
const router = express.Router();
const User = require('../models/user');
const config = require('.././config/config');
const request = require('request');
let userLocation;

request('http://geoip.nekudo.com/api/<ip address>', function(error, response, body) {
    if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        userLocation = body;
    }
})

// Get Routes
router.get('/', function(req, res) {
    //console.log(userLocation);
    res.render('index', {
        info: 'homepage'
    });
});

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.mailer.email,
        pass: config.mailer.password
    }
});

// Post Routes
router.post('/subscribtion', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;

    var emailValidator = validator.validate(email);
    //console.log(emailValidator);

    if (emailValidator && firstname && lastname && email) {
        var newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email
        });
        //console.log(JSON.stringify(newUser, null, 4));
        newUser.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully!');
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: ' " Immigrnt 😎 " ' + config.email, // sender address
            to: 'jesseokeya@gmail.com, larryagbana@gmail.com', // list of receivers
            subject: 'Immigrnt Subscribtion', // Subject line
            text: firstname + ' ' + lastname + ' just subscribed to immgrnt 🤗. Contact details email - ' + email, // plain text body
            html: '<h2 style="font-family: Comic Sans MS;">' + 'Date and Time: ' + getDateTime() + '<br/>' + firstname + ' ' + lastname + ' just subscribed to immgrnt 🤗. <br/> Location details are below 😁 <br/>' + 'ip-adress: ' + userLocation.ip + ', <br/> City: ' + userLocation.city + ', <br/> Country: ' + userLocation.country.name + ', <br/>latitude: ' +
                userLocation.location.latitude + ', <br/> longitude: ' + userLocation.location.longitude + ', <br/> timeZone: ' + userLocation.location.time_zone +
                '<br/> Email: ' + email + ' 👀 . </h2>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            // console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }

    res.redirect('/');

});

function getDateTime() {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/" +
        (currentdate.getMonth() + 1) + "/" +
        currentdate.getFullYear() + " @ " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
    return datetime;
}

module.exports = router
