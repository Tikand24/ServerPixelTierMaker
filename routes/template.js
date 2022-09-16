const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/template');
const checkRol = require('../middleware/rol');
const authMiddleware = require('../middleware/session');
const {
  validatorCreateItem,
  validatorGetItem,
} = require('../validators/template');

router.get('/',authMiddleware, getItems);
router.get('/:id',authMiddleware, validatorGetItem, getItem);
router.post('/',authMiddleware,checkRol(['admin']), validatorCreateItem, createItem);
router.put('/:id',authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
router.delete('/:id',authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
