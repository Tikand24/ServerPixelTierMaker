const { matchedData } = require('express-validator');
const { itemModel,storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await itemModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
};

/**
 * Obtener un item
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await itemModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
};

/**
 * Obtener un item
 * @param {*} req
 * @param {*} res
 */
const getItemByTierId = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const items = await itemModel.find({iterItemId:id}).lean();
    const storageMedia = await storageModel.find({_id:items.map(d=>d.mediaId)}).lean();
    items.forEach(d=>{
      const findMedia = storageMedia.find(s=>s._id.toString() == d.mediaId.toString());
      d.image = findMedia ? findMedia.filename : '';
    })
    res.send({ data:items });
  } catch (error) {
    console.log('erorr',error);
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
};

/**
 * Crear un item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    body = matchedData(req);
    const data = await itemModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_ITEMS');
  }
};

/**
 * Actualizar un item
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const data = await itemModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_ITEMS');
  }
};

/**
 * Eliminar un item
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await itemModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEMS');
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemByTierId,
};
