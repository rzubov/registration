const db = require('../models');

async function get(req, res, next) {

    let user
    try {
        user = await db.models.Registration.findOne({where: {code_email: req.params.code}});
    } catch (e) {
      console.log('Invalid code!')
    }
    let isCodeValid = user && user.code_valid_to.getTime() > new Date().getTime();

    res.end(`<html><body>
            
            Your Code is ${isCodeValid ? req.params.code : 'invalid or expired'}
            
            </body></html>`)
    return next();
}

module.exports = {
    get
}
