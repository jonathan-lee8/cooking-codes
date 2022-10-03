const router = require('express').Router();
const { Recipe } = require('../../models');

//Get all recipes route
router.get('/', async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findAll({
      include: [
        {
          model: Recipe,
          attributes: ['course_name', 'ingredients'],
        },
      ],
    });

    const recipes = dbRecipeData.map((Recipe) =>
      Recipe.get({ plain: true })
    );

    res.render('homepage', {
      recipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get a single recipe route
router.get('/recipe/:id', async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findByPk(req.params.id);

    const Recipe = dbRecipeData.get({ plain: true });

    res.render('Recipe', { Recipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const RecipeData = await Recipe.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!RecipeData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(RecipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;