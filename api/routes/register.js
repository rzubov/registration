const db = require('../models');

async function post(req, res, next) {
    console.log(req.body)

    try {
        await db.models.Registration.create({
            email: req.body.email,
            password: db.sequelize.fn('crypt', req.body.password, db.sequelize.fn('gen_salt', 'bf', 8)),
            phone: req.body.phone
        });
        res.send({
            "kind": "success",
            "response": {
                "message": "Email has been sent"
            }
        });
    } catch (e) {
        console.log(e)
        const errors = e.errors.map(err => ({
            [err.path]: err.message
        }));

        res.send({
            "kind": "error",
            "response": {
                errors
            }
        });
    }
    return next();
}

async function get(req, res, next) {

    const users = await db.models.Registration.findAll();
    res.send({
        "kind": "success",
        "users": users
    });
    return next();
}

module.exports = {
    post,
    get,
}
