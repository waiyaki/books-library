const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const sequelizeFixtures = require('sequelize-fixtures');

const models = require('../models');

const FIXTURES_FILE = path.join(__dirname, 'fixtures.json');

models
  .sequelize
  .drop()
  .then(() => {
    models.sequelize
      .sync()
      .then(() => sequelizeFixtures
        .loadFile(FIXTURES_FILE, models, { log: () => { } }),
      )
      .then(() => {
        process.stdout.write('Successfully loaded data.\n');
        process.exit(0);
      });
  })
  .catch((e) => {
    process.stderr.write(e.toString());
    process.exit(1);
  });
