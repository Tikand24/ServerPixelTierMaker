const { storageModel } = require('../models');
const { handleHttpError } = require('../utils/handleError');
const { matchedData } = require('express-validator');
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_GET_STORAGE');
    
  }
};

/**
 * Obtener un item
 * @param {*} req
 * @param {*} res
 */
const getItem = async(req, res) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DETAIL_STORAGE');
  }
};

/**
 * Crear un item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const { body, file } = req;
    const fileDaa = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`
  
    }
    const data = await storageModel.create(fileDaa);
    res.send({ data });
  } catch (error) {
    console.log('error',error);
    handleHttpError(res, 'ERROR_CREATE_STORAGE');
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
    const dataFile = await storageModel.findById(id);
    const {filename} = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath)
    const data ={
      filePath,
      deleted:1
    }
    res.send({ data });
  } catch (error) {
    handleHttpError(res, 'ERROR_DELETE_STORAGE');
  }
};

module.exports = { getItems, getItem, createItem, deleteItem };
