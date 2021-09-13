const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type : String, required : true},
    name: { type : String, required : true},
    manufacturer: { type : String, required: true}, // fabricant de la sauce
    description: { type : String, required : true},
    mainPepper: { type : String, required : true}, // ingrédient principal de la sauce
    imageUrl: { type : String, required : true},
    heat : { type : Number, required : true },
    likes : { type : Number }, 
    dislikes : { type : Number },
    usersLiked : { type : [String] },
    usersDisliked : { type : [String] }
}); 

module.exports = mongoose.model('Sauce', sauceSchema); 