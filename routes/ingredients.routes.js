const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Ingredient = require('../models/Ingredient.model');


router.get('/', async(req, res) => {
    const allIngredients = await Ingredient.find()
    res.render("ingredients", {allIngredients})
})

router.post('/', async(req, res) => {
    try {
        const data = req.body;
        const newIngredient = await Ingredient.create(data)
        res.redirect('/ingredients')
    }
    catch(err) {console.log(err)}
    
})




















module.exports = router;
