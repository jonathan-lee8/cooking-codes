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
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', (req,res) => {

});

module.exports = router;