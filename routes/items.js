const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemByTierId,
} = require('../controllers/items');
const checkRol = require('../middleware/rol');
const authMiddleware = require('../middleware/session');
const {
  validatorCreateItem,
  validatorGetItem,
} = require('../validators/items');

router.get('/',authMiddleware, getItems);
router.get('/:id',authMiddleware, validatorGetItem, getItem);
router.get('/tier/:id',authMiddleware, validatorGetItem, getItemByTierId);
router.post('/',authMiddleware,checkRol(['admin']), validatorCreateItem, createItem);
router.put('/:id',authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete('/:id',authMiddleware, validatorGetItem, deleteItem);


module.exports = router;
