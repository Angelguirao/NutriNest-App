const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Ingredient = require('../models/Ingredient.model');


router.get('/', async(req, res) => {
    const allIngredients = await Ingredient.find()
    res.render("ingredients", {allIngredients})
    console.log(allIngredients);
})






















module.exports = router;
