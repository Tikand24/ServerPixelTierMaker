const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/tier');
const checkRol = require('../middleware/rol');
const authMiddleware = require('../middleware/session');
const {
  validatorGetItem,
} = require('../validators/tier');

router.get('/',authMiddleware, getItems);
router.get('/:id',authMiddleware, validatorGetItem, getItem);
router.post('/',authMiddleware,checkRol(['admin']), createItem);
router.put('/:id',authMiddleware, validatorGetItem, updateItem);
router.delete('/:id',authMiddleware, validatorGetItem, deleteItem);

module.exports = router;
