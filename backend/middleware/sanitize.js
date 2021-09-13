/**
 * source - https://github.com/component/escape-html
 */

const escapeHTML =require('escape-html');
const mongoSan = require('mongo-sanitize');


module.exports = (req, res, next) => {
    let sauce = req.file ? JSON.parse(req.body.sauce) : req.body;
    sauce.name = escapeHTML(sauce.name); 
    sauce.manufacturer = escapeHTML(sauce.manufacturer);
    sauce.description = escapeHTML(sauce.description);
    sauce.mainPepper = escapeHTML(sauce.mainPepper);

    sauce.name = sauce.name.trim();
    sauce.manufacturer = sauce.manufacturer.trim();
    sauce.description = sauce.description.trim();
    sauce.mainPepper = sauce.mainPepper.trim();

    if(sauce.name == "" || sauce.manufacturer == "" || sauce.description == "" || sauce.mainPepper == "") {
        return res.status(400).json({error: "Les champs ne peuvent pas être vides"});
    } else if(sauce.name.includes('$') || sauce.manufacturer.includes('$') || sauce.description.includes('$') || sauce.mainPepper.includes('$')) {
        return res.status(400).json({error : "Impossible d'utiliser un $"});
    } else {
        req.body.sauce = JSON.stringify(sauce);
        next();
    }
};

