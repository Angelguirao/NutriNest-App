const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Recipe = require('../models/Recipe.model');

//METER FAVORITOS AQUÍ

router.get('/', (req, res) => {
    res.render('recipes')
})


















module.exports = router;
