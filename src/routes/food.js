"use strict";
const express = require("express");

const { FoodTable } = require("../models/index.js");

const foodRouter = express.Router();

foodRouter.get("/food", getFood);
foodRouter.get("/food/:id", getOneFood);
foodRouter.post("/food", createFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);

async function getFood(req, res) {
    let food = await FoodTable.read();
    res.status(200).json(food);
}


async function getOneFood(req, res) {
    const foodId = parseInt(req.params.id);
    let food = await FoodTable.read(foodId);
    res.status(200).json(food);
}

async function createFood(req, res) {
    let newFood = req.body;
    let food = await FoodTable.create(newFood);
    res.status(201).json(food);
}

async function updateFood(req, res) {
    let foodId = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await FoodTable.read(foodId);
    if (foundFood) {
        let updatedFood = await foundFood.update(updateFood);
        res.status(201).json(updatedFood);
    }
}

async function deleteFood(req, res) {

    let foodId = parseInt(req.params.id);
    let deleteFood = await FoodTable.delete(foodId);
    res.status(204).json(deleteFood);
}
module.exports = foodRouter;