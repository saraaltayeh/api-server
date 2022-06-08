"use strict";
require('dotenv').config();

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");

const clothes = require("./clothes");
const food = require("./food");
const Collection = require('./lib/collection-class');

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }
        : {};


let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const clothesTable = clothes(sequelize, DataTypes);
const foodTable = food(sequelize, DataTypes);

const clothesCollection = new Collection(clothesTable);
const foodCollection = new Collection(foodTable);


module.exports = {
    db: sequelize,
    ClothesTable: clothesCollection,
    FoodTable: foodCollection,
};