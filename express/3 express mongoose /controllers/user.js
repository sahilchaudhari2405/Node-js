const { model } = require('mongoose');
const User =require('../models/user.js')
async function handleGetAllUsers(req,res){
    const allUserData=  await User.find({});
   return res.json(allUserData);
}
async function handleGetUserById(req,res){
    const users = await User.findById(req.params.id);
    return res.json(users);
}
async function handleGetDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"delete success"})
}
async function handleGetUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{lastName:req.body.last_name});
    return res.json({status:"update success"})
}
async function handleAddNewUser(req,res){
    const body = req.body;
    if(!body.first_name || !body.last_name|| !body.email || !body.gender || !body.job_title)
    {
        return res.status(400).json({msg:"all fields are req..."});
    }
    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title,
    })
    console.log("result",result); 
    return res.status(201).json({msg: "success",id:result._id});
}
module.exports={
    handleGetAllUsers, 
    handleGetDeleteUserById,
    handleGetUpdateUserById,
    handleGetUserById,
    handleAddNewUser
}