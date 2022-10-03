const router = require('express').Router();
const { Author, User } = require('../models');
const { Course, User } = require('../models');
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const AuthorData = await Author.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const authors = AuthorData.map((author) => author.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      authors, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
