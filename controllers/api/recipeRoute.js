const router = require('express').Router();
const Recipe = require('../../Models/Recipe');

//Get all recipes route
router.get('/', async (req, res) => {
    const recipeData = await Recipe.findAll().catch((err) => { 
      res.json(err);
    });
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('all', { recipes });
});

//Get a single recipe route
router.get('/:id', async (req, res) => {
  try {
  const recipeData = await Recipe.findByPk(req.params.id);
  console.log(recipeData)
  const recipe = recipeData.get({ plain: true });
  res.render('recipe', recipe);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post('/', (req,res) => {

});

router.delete('/:id', (req,res) => {

});

module.exports = router;