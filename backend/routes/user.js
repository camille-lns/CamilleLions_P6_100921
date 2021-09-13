const express = require('express'); 
const router = express.Router();
const userCtrl = require('../controllers/user');
const { route } = require('./sauce');
const schemaPass = require('../middleware/password-validation');
const validEmail = require('../middleware/email-sanitize');

router.post('/signup', validEmail, schemaPass, userCtrl.signup);
router.post('/login', validEmail, schemaPass, userCtrl.login);

module.exports = router; 
