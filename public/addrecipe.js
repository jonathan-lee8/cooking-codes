const newRecipe = async (event) => {
  event.preventDefault();

  const appetizer = document.querySelector('.appetizer').value.trim();
  const breakfast = document.querySelector('.breakfast').value.trim();
  const lunch = document.querySelector('.lunch').value.trim();
  const sides = document.querySelector('.sides').value.trim();
  const dinner = document.querySelector('.dinner').value.trim();
  const dessert = document.querySelector('.dessert').value.trim();

  
}

document
  .querySelector('add-recipe-btn')
  .addEventListener('submit', newRecipe);