const mongoose=require('mongoose');
async function connectionMongooseDb(url){
 return mongoose.connect(url);

}
module.exports ={
    connectionMongooseDb
} 