const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');



router.get('/', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      res.render('profile', { user });
    } catch (error) {
      console.log(error);
    }
  });

router.post('/', async (req, res) => {
    const { name, email, age, gender, weight, height } = req.body;
  
    try {
      let user = await User.findOne({email});
  
      if (user) {
        user.name = name || user.name;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.weight = weight || user.weight;
        user.height = height || user.height;
  
        user = await user.save();
        console.log('Updated user:', user);
      }
      res.redirect('/profile');
    } catch(error) {
        console.log(error);
    }
});








module.exports = router;