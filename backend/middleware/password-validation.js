const schemaPass = require('../models/password');

module.exports = (req, res, next) => {
    if(schemaPass.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({message: 'Le mot de passe ne correspond pas au modèle attendu'});
    }
};