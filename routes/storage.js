const express = require('express');
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
} = require('../controllers/storage');
const {
  validatorGetItem,
} = require('../validators/storage');
const uploadMiddleware = require('../utils/handleStorage');
const authMiddleware = require('../middleware/session');

/**
 * list of storages
 */
router.get('/',authMiddleware, getItems);

/**
 * detail of storage
 */
router.get('/:id', validatorGetItem, getItem);

/**
 * create storage
 */
router.post('/',authMiddleware, uploadMiddleware.array('myfile'), createItem);
/**
 * delete storage
 */
router.delete('/:id',authMiddleware, validatorGetItem, deleteItem);
module.exports = router;
