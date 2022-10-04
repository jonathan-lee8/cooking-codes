// import the module
const recipeScraper = require("recipe-scraper");

// enter a supported recipe url as a parameter - returns a promise
async function someAsyncFunc() {
  let recipe = await recipeScraper("https://www.epicurious.com/recipes/food/views/marjolaine-cake-recipe");

// using Promise chaining
recipeScraper("https://www.epicurious.com/recipes/food/views/marjolaine-cake-recipe")
.then(recipe => {
    recipe.create  ({
      name: req.body.name,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      total_time: req.body.time,
      image_url: req.body.image,
    })
  res.status(200).json(recipeScraper);
  })
  .catch((err) => res.json(err))};

  someAsyncFunc();