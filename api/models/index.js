const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config');

class Database {
    /**
     *
     * @param {object} dbConfig
     */
    constructor(dbConfig) {
        this._basename = path.basename(module.filename);

        this._sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
        this._models = {};

        fs.readdirSync(__dirname)
            .filter((file) => file.indexOf('.') !== 0 && file !== this._basename && file.slice(-3) === '.js')
            .forEach((file) => {
                const model = this._sequelize.import(path.join(__dirname, file));
                this._models[model.name] = model;
            });
    }

    getModels() {
        return this._models;
    }

    getSequelize() {
        return this._sequelize;
    }
}

const database = new Database(config.development);
const models = database.getModels();
const sequelize = database.getSequelize();
module.exports = {
    models,
    sequelize,
}

