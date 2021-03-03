const express = require('express');
const UserModel = require('../models/User.model');
const router = express.Router();

/* GET sign in page */
router.get('/signin', (req, res, next) => res.render('auth/signin'));

/* GET sign up page */

router.get('/signup', (req, res, next) => res.render('auth/signup'));

/* POST sign in page */

router.post('/signin', async (req, res, next) => {

    const password = req.body.password
    const username = req.body.username
    const user = await UserModel.findOne({username: username})

    if (!user) {
        // req.flash("error", "Invalid credentials");
        res.redirect("/auth/signin")
    } else {
        const isSamePassword = password === user.password;
    
        if(!isSamePassword) {
            // req.flash("error", "Invalid credentials");
            res.redirect("/auth/signin")
        } else {

            const userObject = user.toObject()
            delete user.password
            req.session.currentUser = userObject

            // req.flash("success", "Successfully logged in...")
            res.redirect("/")
        }
    }


})


/* POST sign up page */

router.post(('/signup'), async (req, res, next) => {
    
    try {
        const newUser = { ...req.body };
        const foundUser = await UserModel.findOne({username: newUser.username});

        if (foundUser) {
            // req.flash("warning", "Username already registered");
            res.redirect("/auth/signup");
        } else {
            await UserModel.create(newUser);
            // req.flash("success", "Congrats, you are now registered")
            res.redirect("/auth/signin");
        }

    } catch (err) {
        next(err)
    }
    
});


module.exports = router;