/**
 * doc crypto - https://cryptojs.gitbook.io/docs/ 
 */


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto-js');
require('dotenv').config({path: '../config.env'});

const TOOKEN = process.env.TOOKEN;

// pour crypto
const key = crypto.enc.Base64.parse(process.env.CR_KEY);
const iv = crypto.enc.Base64.parse(process.env.CR_IV);

// pour s'inscrire sur le site
exports.signup = (req, res, next) => {
    const newMail = crypto.AES.encrypt(req.body.email, key, {iv : iv}).toString(); 
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: newMail, 
                password: hash
            }); 
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};


// pour se connecter
exports.login = (req, res, next) => {
    const newMail = crypto.AES.encrypt(req.body.email, key, {iv : iv}).toString(); 
    User.findOne({ email: newMail })
        .then(user => { 
            if (!user) {
                return res.status(401).json({error: 'Utilisateur inexistant'}); 
            } 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error: 'Mot de passe incorrect'}); 
                    }
                    res.status(200).json({ 
                        userId: user._id, 
                        token: jwt.sign(
                            { userId: user._id}, 
                            TOOKEN, 
                            { expiresIn: '24h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
            })
        .catch(error => res.status(500).json({ error }));
}; 