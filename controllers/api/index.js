const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoute');

router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);

module.exports = router;