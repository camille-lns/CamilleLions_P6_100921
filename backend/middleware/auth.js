const jwt = require('jsonwebtoken'); 
require('dotenv').config({path :'./config.env'});

const TOOKEN = process.env.TOOKEN;

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, TOOKEN);
        const userId = decodedToken.userId; 
        
        // pour comparaison entre sauce.userId et userId actuel
        req.body.decodedId = userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable'; 
        } else {
            next();        
        }
    } catch {
        res.status(401).json({error: new Error('Erreur')
        });
    }
};