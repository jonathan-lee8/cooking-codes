const sequelize = require('../config/connection');
const { User, Recipe } = require('../Models');

const recipeSeedData = require('./recipeSeedData.json');
const userSeedData = require('./userSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({force:true});

    const users = await User.bulkCreate(userSeedData);

    for(const recipe of recipeSeedData) {
        const newRecipe = await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].isSoftDeleted,
        });
    }

    process.exit(0);
};

seedDatabase();