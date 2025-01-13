const { v4: uuidv4 } = require('uuid');
const { Wine } = require('../models');

const  getAll = async (res) => {
    try{
        const wines = await Wine.findAll();
        return res.status(200).json({
            hasError: false,
            message: 'Wines retrieved successfully!',
            data: wines,
        });
    }catch(error){
        res.status(400).json({
            hasError: true,
            message: 'An error occurred while fetching wines.',
            error: error.message 
        });
    }
};

const  getById = async (req,res) => {
    try{
        const wineId = req.params.id;

        if (!wineId) {
            return res.status(400).json({ 
                hasError: true,
                message: 'ID is required.',
                error: error.message
            });
        }

        const wine = await Wine.findByPk(wineId);
        if (!wine) {
            return res.status(404).json({
                hasError: true,
                message: 'Wine not found.',
                error: error.message
            });
        }

        res.status(200).json({
            hasError: false,
            message: 'Wine retrieved successfully!',
            data: wine,
        });

    }catch(error){
        res.status(400).json({
            hasError: true,
            message: "Error fetching wine", 
            error: error.message});
    }
};

const addWine = async(req,res) => {
    try{
        const wine = await Wine.create({
            id : uuidv4(),
            name: req.body.name,
            harvest: req.body.harvest,
            stock: req.body.stock
        });
        res.status(200).json({
            hasError: false,
            message: 'Wine added successfully!', 
            data: wine });
    }catch(error){
        res.status(400).json({
            hasError: true,
            message: "Error adding wine",
            error: error.message})
    }
};

module.exports = {
    getAll,
    getById,
    addWine,
};