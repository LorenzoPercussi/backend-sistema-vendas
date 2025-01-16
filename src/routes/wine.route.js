const express = require('express');
const {
  getAll,
  addWine,
  getById,
  deleteWine,
} = require('../controllers/WineController');
const router = express.Router();

/**
 * @swagger
 * /wine/getAll:
 *   get:
 *     summary: Retorna todos os vinhos
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Erro
 */
router.get('/getAll', getAll);

router.get('/getById/:id', getById);
/**
 * @swagger
 * /wine/addWine:
 *   post:
 *     summary: Adiciona um vinhos
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Erro
 */
router.post('/addWine', addWine);

router.delete('/deleteWine', deleteWine);

module.exports = router;
