const db = require('../models');

async function post(req, res, next) {
    const {request} = req.body;

    try {
        await db.models.Registration.create({
            email: request.email,
            password: db.sequelize.fn('crypt', request.password, db.sequelize.fn('gen_salt', 'bf', 8)),
            phone: request.phone
        });


        res.send({
            "kind": "success",
            "response": {
                "message": res.__("Email has been sent")
            }
        });
    } catch (e) {

        const errors = e.errors.map(err => ({
            [err.path]: res.__(err.message)
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

    const users = await db.models.Registration.findAll({
        attributes: {
            exclude: ["password"]
        }
    });
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
