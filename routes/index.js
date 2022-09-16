const express = require('express');
const router = express.Router();
const fs = require("fs");

const PATH_ROUTES = `${__dirname}`;

const removeExtension = (fileName)=>{
    return fileName.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((f)=>{
    const name = removeExtension(f);
    if(name !== 'index'){
        router.use(`/${name}`,require(`./${f}`));
    }
})

module.exports = router;