const express = require("express")
const PORT = 8002;
const {connectionMongooseDb}=require('./connection');
const app=express();
const urlRoutes=require('./routes/url')
const URl = require('./models/url')
connectionMongooseDb("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log("server connected") 
});
app.use(express.json());
app.use('/url',urlRoutes)
app.get('/:shortId',async (req,res)=>{
    const shortId =req.params.shortId;
  const entry=  await URl.findOneAndUpdate({
        shortId,
    },{
        $push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl); 
})
app.listen(PORT,()=>console.log("server start"))