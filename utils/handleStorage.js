const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null,pathStorage);
    },
    filename: function(req,file,cb){
        console.log('reqFileName',file);
        const ext = file.originalname.split('.').pop();
        const filenamePath = `file-${Date.now()}.${ext}`;
        cb(null,filenamePath);
    }
});
const uploadMiddleware = multer({storage});
module.exports = uploadMiddleware;