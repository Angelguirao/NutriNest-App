const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const uploader = require("../config/cloudinary.config.js")
const {isLoggedIn, isLoggedOut} = require('../middlewares/route-guard-middleware')


router.get('/', async (req, res) => {
    try {
        let user = await User.findById(req.session.user._id);
        res.render('profile/my-profile', {user, errorMessage: ""});
    } catch (error) {
      console.log(error);
    }
  });

router.get('/settings', async (req, res) => {
    try {
      let user = await User.findById(req.session.user._id);
      res.render('profile/settings', {user, errorMessage: ""});
    } catch (error) {
      console.log(error);
    }
  });

router.post('/', uploader.single("img"), async (req, res) => {
  const newUser = req.body;
  let mongoUser = await User.findById(req.session.user._id);
  
    try {  
      if (mongoUser) {
        mongoUser.name = newUser.name || mongoUser.name;
        mongoUser.lastname = newUser.lastname || mongoUser.lastname;
        mongoUser.age = newUser.age || mongoUser.age;
        mongoUser.gender = newUser.gender || mongoUser.gender;
        mongoUser.weight = newUser.weight || mongoUser.weight;
        mongoUser.height = newUser.height || mongoUser.height;
        mongoUser.description = newUser.description || mongoUser.description;
  
        mongoUser = await mongoUser.save();
        console.log('Updated user:', {mongoUser, errorMessage: ""});
      }
      res.redirect('/profile');
    } catch(error) {
        console.log(error);
    }
});

router.post('/settings', async (req, res) => {
  const newUser = req.body;
  let mongoUser = await User.findById(req.session.user._id);
  console.log(newUser);

  try {

    if (mongoUser) {

      if (!newUser.current_password) {
        newUser.current_password = "";
      }

      if (newUser.current_password) {
        if (bcryptjs.compareSync(newUser.current_password, mongoUser.password)) {
          const salt = bcryptjs.genSaltSync(10);
          const hashedPassword = bcryptjs.hashSync(newUser.new_password, salt);
          mongoUser.password = hashedPassword;
        }
      }

      mongoUser.email = newUser.email || mongoUser.email;
      mongoUser = await mongoUser.save();
      console.log('Updated user:', {mongoUser, errorMessage: "The change/s have been applied."});
    }
    res.redirect('/profile/settings');
  } catch(error) {
      console.log(error);
  }
});

module.exports = router;