var express = require('express');
var router = express.Router();
var User = require('../models/user');

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

    if (firstname && lastname && email) {
        var newUser = new User({
            firstname: firstname,
            lastname: lastname,
            email: email
        });

        console.log(newUser);

        newUser.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully!');
        });
    }

    res.redirect('/');

});

module.exports = router
