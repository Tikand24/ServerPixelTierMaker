const { matchedData } = require('express-validator');
const { categoryModel,templateModel,storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');

/**
 * Obtener lista de base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const tiers = await categoryModel.find({}).lean();
    const tiersItems = await templateModel.find({tierId:tiers.map(d=>d._id)}).lean();
    const storageMedia = await storageModel.find({_id:tiersItems.map(d=>d.mediaId)}).lean();
    tiers.forEach(tier => {
      const items = tiersItems.filter(tierItem=>tierItem.tierId.toString() == tier._id.toString());
      items.forEach((i)=>{
        const storageFind = storageMedia.find(s=>s._id.toString() ==i.mediaId.toString());
        i.image = storageFind ? storageFind.filename : '';
      })
      tier.templates = items;
    });
    res.send({ data:tiers });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_CATEGORY');
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
    const data = await categoryModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_CATEGORY');
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
    const data = await categoryModel.create(body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_CREATE_CATEGORY');
    console.log('error',error);
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
    const data = await categoryModel.findOneAndUpdate(id, body);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_UPDATE_CATEGORY');
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
    const data = await categoryModel.delete({_id:id});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_CATEGORY');
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
