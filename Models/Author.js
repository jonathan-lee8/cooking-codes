const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Author extends Model {}

Author.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'author',
    }
);

module.exports = Author;
