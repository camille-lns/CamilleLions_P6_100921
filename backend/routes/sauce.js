const express = require('express'); 
const router = express.Router(); 

const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');
const sanitize = require('../middleware/sanitize');

// create one sauce
router.post('/', auth, multer, sanitize, stuffCtrl.createSauce);

// modify one sauce
router.put('/:id', auth, multer, sanitize, stuffCtrl.modifySauce);

// delete one sauce
router.delete('/:id', auth, stuffCtrl.deleteSauce);

// get one sauce
router.get('/:id', auth, stuffCtrl.getOneSauce);

// get all sauces
router.get('/', auth, stuffCtrl.getAllSauce);

// ajouter ou retirer un like 
router.post('/:id/like', auth, stuffCtrl.like);

module.exports = router; 