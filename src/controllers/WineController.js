const { v4: uuidv4 } = require('uuid');
const { Wine } = require('../models');
const logger = require('../config/logger');

const getAll = async (res) => {
  try {
    const wines = await Wine.findAll();
    return res.status(200).json({
      hasError: false,
      message: 'Wines retrieved successfully!',
      data: wines,
    });
  } catch (error) {
    logger.error(`Error fetching wines: ${error.message}`);
    res.status(500).json({
      hasError: true,
      message: 'An error occurred while fetching wines.',
    });
  }
};

const getById = async (req, res) => {
  try {
    const wineId = req.params.id;

    if (!wineId) {
      logger.error(`Error fetching wines: ${error.message}`);
      return res.status(400).json({
        hasError: true,
        message: 'ID is required.',
      });
    }

    const wine = await Wine.findByPk(wineId);
    if (!wine) {
      logger.error(`Error fetching wines: ${error.message}`);
      return res.status(404).json({
        hasError: true,
        message: 'Wine not found.',
      });
    }

    res.status(200).json({
      hasError: false,
      message: 'Wine retrieved successfully!',
      data: wine,
    });
  } catch (error) {
    logger.error(`Error fetching wines: ${error.message}`);
    res.status(500).json({
      hasError: true,
      message: 'Error fetching wine',
    });
  }
};

const addWine = async (req, res) => {
  try {
    const wine = await Wine.create({
      id: uuidv4(),
      name: req.body.name,
      harvest: req.body.harvest,
      stock: req.body.stock,
    });
    res.status(200).json({
      hasError: false,
      message: 'Wine added successfully!',
      data: wine,
    });
  } catch (error) {
    logger.error(`Error fetching wines: ${error.message}`);
    res.status(500).json({
      hasError: true,
      message: 'Error adding wine',
    });
  }
};

const deleteWine = async (req, res) => {
  try {
    await Wine.destroy({
      where: {
        id: req.body.guid,
      },
    });
    res.status(200).json({
      hasError: false,
      message: 'Wine deleted successfully!',
    });
  } catch (error) {
    logger.error(`Error fetching wines: ${error.message}`);
    res.status(500).json({
      hasError: true,
      message: 'Error deleting wine',
    });
  }
};

module.exports = {
  getAll,
  getById,
  addWine,
  deleteWine,
};
