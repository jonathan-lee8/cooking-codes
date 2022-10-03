const router = require('express').Router();
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');

//Get all recipes for the homepage
router.get('/recipes', async (req, res) => {
    const recipeData = await Recipe.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    }).catch((err) => { 
      res.json(err);
    });
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render('all', { recipes });
});

//Get a single recipe route
router.get('/recipes/:id', async (req, res) => {
    try {
    const recipeData = await Recipe.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });
    console.log(recipeData);
    const recipe = recipeData.get({ plain: true });
    res.render('recipe', recipe);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get specific user data
router.get('/users/:id', async (req,res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                {
                    model: Recipe,
                    attributes: [
                        'id',
                        'name',
                        'total_time',
                        'image_url',
                    ],
                },
            ],
        });
        console.log(userData);
        const user = userData.get({plain:true});
        res.render('user', {user, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});