const { matchedData } = require('express-validator');
const { tierModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await tierModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_TIER');
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
    const data = await tierModel.findById(id);
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
    req = matchedData(req);
    const { tiers } = req;
    const data = await tierModel.insertMany(tiers);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_TIER');
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
    const data = await tierModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_TIER');
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
    const data = await tierModel.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_TIER');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
