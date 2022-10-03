const router = require('express').Router();
const Recipe = require('../../Models/Recipe');

router.post('/', async (req,res) => {
    try {
        const dbRecipeData = await Recipe.create({
            name: req.body.name,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients,
            total_time: req.body.total_time,
            image_url: req.body.image_url,
            course_name: req.body.course_name,
            user_id: req.session.user_id, //Need to save user id in session and get it from there to add to recipe.
        });
        res.status(200).json(dbRecipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', (req,res) => {
    Recipe.destroy({
        where: {
            id: req.params.id,
        },
    })
      .then((deletedRecipe) => {
        res.json(deletedRecipe);
      })
      .catch((err) => res.json(err));
});

module.exports = router;