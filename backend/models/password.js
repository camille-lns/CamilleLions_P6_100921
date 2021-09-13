/**
 * source - https://www.npmjs.com/package/password-validator 
 */

const validator = require('password-validator');

const schemaPass = new validator();

schemaPass
.is().min(8)
.is().max(30)
.has().uppercase(1)
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['PassW0rd1','Password123','Passw0rd1']);

module.exports = schemaPass;
