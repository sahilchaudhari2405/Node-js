const express = require('express');
const PORT=8001;
const app=express();
const {connectionMongooseDb}=require('./connection');
const userRouter = require('./routes/user');
const {logReqRes}=require('./middlewares');

connectionMongooseDb("mongodb://127.0.0.1:27017/user-data").then(()=>{
    console.log("server connected") 
});
app.use(express.urlencoded({extended:false}));
app.use(logReqRes('log.txt'))
app.use('/api/user',userRouter); 
app.listen(PORT,()=>console.log("server start"));