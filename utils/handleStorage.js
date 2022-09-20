const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null,pathStorage);
    },
    filename: function(req,file,cb){
        const ext = file.originalname.split('.').pop();
        const filenamePath = `file-${uuidv4()}.${ext}`;
        if(!req.filePaths){
            req.filePaths=[];
        }
        req.filePaths = [...req.filePaths,filenamePath]
        console.log('files',req.filePaths);
        cb(null,filenamePath);
    }
});
const uploadMiddleware = multer({storage});
module.exports = uploadMiddleware;