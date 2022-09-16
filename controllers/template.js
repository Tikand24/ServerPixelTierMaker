const { matchedData } = require('express-validator');
const { templateModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await templateModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEM_TIER');
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
    const data = await templateModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_ITEM_TIER');
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
    const data = await templateModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_ITEM_TIER');
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
    const data = await templateModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_ITEM_TIER');
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
    const data = await templateModel.delete({_id:id});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_ITEM_TIER');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
