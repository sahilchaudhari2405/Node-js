const express = require('express');
const User = require('./MOCK_DATA.json');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));
app.get('/api/user', (req, res) => {
    res.setHeader("x-myname","Sahil")
    return res.json(User);
})
app.get('/user', (req, res) => {
    const html = `
    <ul>${User.map((user) => `<li>${user.first_name}</li>`)}</ul>
    `
    res.send(html); 
})
app.route('/api/user/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = User.find((users) => users.id === id);
    return res.json(user);
})
    .put((req, res) => {
        res.json({ status: "pending" })
    })
    .patch((req, res) => {

        const getId = Number(req.params.id);


        const body = req.body;


        const userIndex = User.findIndex((user) => user.id === getId);


        const gotUser = User[userIndex];


        const updatedUser = { ...gotUser, ...body };


        User[userIndex] = updatedUser;
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(User), (err, data) => {
            return res.json({ status: "Success", updatedUser });
        })

    })
    .delete((req, res) => {
        const getId = Number(req.params.id);


        const body = req.body;


        const userIndex = User.findIndex((user) => user.id === getId);

        const deleteUser = User.splice(userIndex, 1);
        User.forEach((user, index) => {
            user.id = index + 1;
        });
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(User), (err, data) => {
            return res.json({ status: "Success", deleteUser });
        })
    })
app.post('/api/user', (req, res) => {
    const body = req.body;
    User.push({ ...body, id: User.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(User), (err, data) => {
        return res.status(201).json({ status: "success", id: User.length })
    })

})
app.listen(PORT, () => console.log("server start"));