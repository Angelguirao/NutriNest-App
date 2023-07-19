const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const uploader = require("../config/cloudinary.config.js")
const mongoose = require("mongoose");
const {isLoggedIn, isLoggedOut} = require('../middlewares/route-guard-middleware')


router.get('/', isLoggedIn, async (req, res) => {
  try {
      let user = await User.findById(req.session.user._id);
      res.render('profile/my-profile', {user, errorMessage: ""});
  } catch (error) {
    console.log(error);
  }
});
router.get('/settings', isLoggedIn, async (req, res) => {
  try {
    let user = await User.findById(req.session.user._id);
    res.render('profile/settings', {user, errorMessage: ""});
  } catch (error) {
    console.log(error);
  }
});
router.post('/', uploader.single("img"), async (req, res) => {
const newUser = req.body;
if (req.file) {
  newUser.img = req.file.path;
}
try {
    let mongoUser = await User.findById(req.session.user._id);
    if (mongoUser) {
      mongoUser.name = newUser.name || mongoUser.name;
      mongoUser.lastname = newUser.lastname || mongoUser.lastname;
      mongoUser.age = newUser.age || mongoUser.age;
      mongoUser.img = newUser.img || mongoUser.img;
      mongoUser.gender = newUser.gender || mongoUser.gender;
      mongoUser.weight = newUser.weight || mongoUser.weight;
      mongoUser.height = newUser.height || mongoUser.height;
      mongoUser.description = newUser.description || mongoUser.description;
      const user = await mongoUser.save();
      console.log('Updated user:', user);
      res.render('profile/my-profile', {user, errorMessage: "Changes made successfully."});
    }
  } catch(error) {
      console.log(error);
  }
});
router.post('/settings', uploader.single("img"), async (req, res) => {
const newUser = req.body;
if (req.file) {
  newUser.img = req.file.path;
}
try {
  let mongoUser = await User.findById(req.session.user._id);
  console.log(newUser);
  if (mongoUser) {
    if (!newUser.currentPassword) {
      newUser.currentPassword = "";
    }
    if (newUser.currentPassword) {
      if (bcryptjs.compareSync(newUser.currentPassword, mongoUser.password)) {
        const salt = bcryptjs.genSaltSync(10);
        const hashedPassword = bcryptjs.hashSync(newUser.newPassword, salt);
        mongoUser.password = hashedPassword;
      } else {
        const user = mongoUser;
        res.status(500).render('profile/settings', {user,
          errorMessage: "The current password is not correct. Please try again."
       });
       return;
      }
    }
    mongoUser.email = newUser.email || mongoUser.email;
    const user = await mongoUser.save();
    console.log('Updated user:', user);
    res.render('profile/settings', {user, errorMessage: "Changes made successfully."});
  }
} catch(error) {
  let user = await User.findById(req.session.user._id);
  if (error instanceof mongoose.Error.ValidationError) {
      res.status(500).render('profile/settings', {user, errorMessage: error.message });
    } else if (error.code === 11000) {
      res.status(500).render('profile/settings', {user,
         errorMessage: "Email is already in use. Please try changing it to a different email or log into your account."
      });
    } else {
      console.log(error);
  }
}
});
module.exports = router;