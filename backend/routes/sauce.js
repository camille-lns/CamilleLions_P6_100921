const express = require('express'); 
const router = express.Router(); 

const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const sanitize = require('../middleware/sanitize');

// create one sauce
router.post('/', auth, multer, sanitize, sauceCtrl.createSauce);

// modify one sauce
router.put('/:id', auth, multer, sanitize, sauceCtrl.modifySauce);

// delete one sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// get one sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

// get all sauces
router.get('/', auth, sauceCtrl.getAllSauce);

// ajouter ou retirer un like 
router.post('/:id/like', auth, sauceCtrl.like);

module.exports = router; 