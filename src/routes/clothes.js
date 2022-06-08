"use strict";
const express = require("express");

const { Clothes } = require("../models/clothes");


const clothesRouter = express.Router();
clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.post("/clothes", createClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);

async function getClothes(req, res) {
    let clothes = await Clothes.read();
    res.status(200).json(clothes);
}
//if we want to find one

async function getOneClothes(req, res) {
    const clothesId = parseInt(req.params.id);
    let clothes = await Clothes.read(clothesId);
    res.status(200).json(clothes);
}

async function createClothes(req, res) {
    let newClothes = req.body;
    let clothes = await Clothes.create(newClothes);
    res.status(201).json(clothes);
}

async function updateClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let updateClothes = req.body;
    let foundClothes = await Clothes.read(clothesId);
    if (foundClothes) {
        let updatedClothes = await foundClothes.update(updateClothes);
        res.status(201).json(updatedClothes);
    }
}
async function deleteClothes(req, res) {

    let clothesId = parseInt(req.params.id);
    let deleteClothes= await Clothesdelete(clothesId);
    res.status(204).json(deleteClothes);
}
module.exports = clothesRouter;