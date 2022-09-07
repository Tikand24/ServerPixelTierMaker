const bcryptjs = require("bcryptjs");

const encrypt = async (passwordPlain)=>{
   return  await bcryptjs.hash(passwordPlain,10);
}
const compare = async (passwordPlain,hashPasword)=>{
        return await bcryptjs.compare(passwordPlain,hashPasword)
}

module.exports = {encrypt,compare};