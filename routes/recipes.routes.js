const { Router } = require('express');
const router = new Router();
const Recipe = require('../models/Recipe.model');
const Ingredient = require('../models/Ingredient.model');
const uploader = require('../config/cloudinary.config.js')
const {isLoggedIn} = require('../middlewares/route-guard-middleware')


//METER FAVORITOS AQUÍ

router.get('/', isLoggedIn, async (req, res, next) => {
    try {
      const allRecipes = await Recipe.find()
      res.render('recipes/all', { allRecipes })
    } catch (error) {
      console.log(error)
    }
  })

  /* GET new recipe page */
router.get('/new', isLoggedIn, async (req, res, next) => {
  try {
    const ingredientsList = await Ingredient.find()
    res.render('recipes/new', {ingredientsList})
  }
  catch(err) {console.log(err)}
 
  })



  

  router.post('/new', uploader.single('photo'), async (req, res, next) => {
    const { name, duration, instructions, totalCalories, protein, carbs, fat, ingredients } = req.body;
    const photo = req.file.path;
  
    try {
      const newRecipe = await Recipe.create({
        name,
        photo,
        duration,
        instructions,
        ingredients,
        totalCalories,
        totalMacros: {
          protein,
          carbs,
          fat,
        },
      });
  
      res.redirect(`/recipes/${newRecipe._id}`);
    } catch (error) {
      console.log(error);
    }
  });
  
/* GET update recipe page */
router.get('/:recipeId/update', async (req, res, next) => {
    const recipe = await Recipe.findById(req.params.recipeId)
    res.render('recipes/update', { recipe })
  })
  

  /* POST updated recipe data */
  router.post('/:recipeId/update', async (req, res, next) => {
    console.log(req.body, req.params)
    try {
      await Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
      res.redirect(`/recipes/${req.params.recipeId}`)
    } catch (error) {
      console.log(error)
    }
  })

  /* GET one recipe page */
router.get('/:recipeId', isLoggedIn, async (req, res, next) => {
                              //Solo encontrar ingredientes dentro de las recetas
  console.log(req.params.recipeId)
  const recipeId = req.params.recipeId

    try {
      const recipe = await Recipe.findById(recipeId)
        .populate('ingredients')

       

      console.log(recipe)

      // TODO: Show new view with the recipe
      res.render('recipes/one', { recipe })
    } catch (error) {
      console.log(error)
    }
  })
  
  /* POST delete recipe */
  router.post('/:recipeId/delete', async (req, res, next) => {
    console.log(req.params)
    try {
      await Recipe.findByIdAndDelete(req.params.recipeId)
      res.redirect('/recipes')
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router