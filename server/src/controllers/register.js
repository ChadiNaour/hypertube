const multer = require('multer')
const express = require('express');
var Jimp = require('jimp');
const app = express()
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const uti = require('../util/lib');
const user = require('../models/user');
const sendmail = require('./sendmail');
const saltRounds = 10;


app.post('/register', async (req, res) => {
    const { firstname, lastname, username, email, password, confirmPassword } = req.body;
    let GetUserByUsername = await user.getUser('GetUserByUsername', username);
    let GetUserByEmail = await user.getUser('GetUserByEmail', email);
    let data = {
        isValid: true,
        errUsername: null,
        errEmail: null,
    };
    if (GetUserByEmail) {
        data.errEmail = 'Email already exists';
    }
    if (GetUserByUsername) {
        data.errUsername = 'Username already exists';
    }
    if (!uti.isFirstname(firstname) || !uti.isLastname(lastname) || !uti.isUsername(username) || !uti.isEmail(email) || GetUserByEmail || GetUserByUsername || !uti.isPassword(password, confirmPassword)) {
        data.isValid = false;
    }
    else {
        try {
            let hashPassword = await bcrypt.hash(password, saltRounds);
            const vfToken = crypto.randomBytes(64).toString('hex');
            user.Register(firstname, lastname, username, email, hashPassword);
            user.UpdatvfToken(email, vfToken);
            sendmail.sendEmail(email, vfToken);
        }
        catch (e) {
            data.isValid = false;
        }
    }
    res.send(data);
});
module.exports = app;