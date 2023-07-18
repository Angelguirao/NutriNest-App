const { Router } = require('express');
const router = new Router();
const Ingredient = require('../models/Ingredient.model');
const uploader = require('../config/cloudinary.config.js')
const {isLoggedIn} = require('../middlewares/route-guard-middleware')

router.get('/', isLoggedIn, async(req, res) => {
    const allIngredients = await Ingredient.find()
    res.render("ingredients/ingredients", {allIngredients})
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
        res.redirect('ingredients')
        console.log('Newly created ingredient: ', newIngredient);

    }
    catch(err) {console.log(err)}
    
})

router.get('/:ingredientId', isLoggedIn, async(req, res) => {
    const ingredientId = req.params.ingredientId;
    try {
        const ingredient = await Ingredient.findById(ingredientId)
        res.render('ingredients/one', {ingredient})
    }
    catch (error) {
        console.log(error)
    }

})

router.post('/:ingredientId/delete', async (req, res, next) => {
    console.log(req.params)
    try {
      await Ingredient.findByIdAndDelete(req.params.ingredientId)
      res.redirect('/ingredients')
    } catch (error) {
      console.log(error)
    }
  })


module.exports = router;
