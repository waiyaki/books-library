const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { pascalize } = require('humps');

const env = process.env.NODE_ENV || 'development';

// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/sequelize_config.json`)[env];

const basename = path.basename(module.filename);
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config,
  );
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[pascalize(model.name)] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
