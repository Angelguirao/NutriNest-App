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
        const {name, kcal100g, protein, fat, carbs} = req.body
        const macros100g = [{protein, fat, carbs}]
        const newIngredient = await Ingredient.create({
            name,
            kcal100g,
            macros100g,
        })
        res.redirect('/ingredients')
    }
    catch(err) {console.log(err)}
    
})




















module.exports = router;
