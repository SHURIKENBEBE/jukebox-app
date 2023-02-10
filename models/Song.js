const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Song extends Model {}

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        genre: {
            type: DataTypes.STRING,
        },

        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

        user_id:{
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestampes: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'song',
    }
);

module.exports = Song;