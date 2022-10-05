const router = require('express').Router();
const { User, Recipe } = require('../models');

// router.get('/', (req,res) => {
//     res.render('homepage');
// });
router.get('/addrecipe', (req,res) => {
    res.render('recipeform');
});

router.get('/account/:id', async (req,res) => {
    try{
        const userdata = await User.findByPk(req.params.id, {
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
        res.render('account', userdata.get({plain:true}));
    } catch(err) {
        res.json(err);
    }
});

router.get('/search', (req,res) => {
    res.render('search');
});

//Get all recipes for the homepage
router.get('/', async (req, res) => {
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
    const recipe = recipes[Math.floor(Math.random()* recipes.length)];
    //res.json(recipes);
    res.render('homepage', recipe);
});

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
    const recipe = recipes[Math.floor(Math.random()* recipes.length)];
    res.json(recipes);
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
    //res.json(recipe);
    res.render('recipies', recipe);
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
        res.json(user);
        //res.render('user', {user, loggedIn: req.session.loggedIn});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req,res) => {
    res.render('login');
})

module.exports = router;