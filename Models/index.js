const Recipe = require('./Recipe');
const Course = require('./Course');
const Author = require('./Author');

Recipe.belongsTo(Author, {
    foreignKey: 'author_id',
});

Recipe.belongsTo(Course, {
    foreignKey: 'course_id',
});

Course.hasMany(Recipe, {
    foreignKey: 'course_id',
    onDelete: 'CASCADE',
});

Author.hasMany(Recipe, {
    foreignKey: 'author_id',
    onDelete: 'CASCADE',
});

module.exports = { Recipe, Course, Author};
