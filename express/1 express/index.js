const express = require('express');
const app = express();
app.get("/",(req,res)=>{
    return res.send("hey this is sahil")
});
app.get("/about",(req,res)=>{
    return res.send(`hey ${req.query.name}`)
});
app.listen(8001,()=>console.log("server start"));