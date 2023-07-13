const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Ingredient = require('../models/Ingredient.model');


router.get('/', (req, res) => {
    res.render('ingredients')
})




















module.exports = router;
