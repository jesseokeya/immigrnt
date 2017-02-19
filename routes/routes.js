const express = require('express');
const validator = require("email-validator");
const router = express.Router();
const User = require('../models/user');

// Get Routes
router.get('/', function(req, res) {
    res.render('index', {
        info: 'homepage'
    });
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

        console.log(JSON.stringify(newUser, null, 4));

        newUser.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully!');
        });
    }

    res.redirect('/');

});

module.exports = router
