const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const Ingredient = require('../models/Ingredient.model');
const uploader = require('../config/cloudinary.config.js')

router.get('/', async(req, res) => {
    const allIngredients = await Ingredient.find()
    res.render("ingredients", {allIngredients})
})

router.post('/', uploader.single('photo'), async(req, res) => {
    try {
        const photo = req.file.path;
        const {name, kcal100g, protein, fat, carbs} = req.body
        const macros100g = [{protein, fat, carbs}]
        const newIngredient = await Ingredient.create({
            name,
            kcal100g,
            macros100g,
            photo,
        })
        res.redirect('/ingredients')
    }
    catch(err) {console.log(err)}
    
})




















module.exports = router;
