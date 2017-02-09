const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const cuid = require('cuid');
const faker = require('faker'); // eslint-disable-line import/no-extraneous-dependencies

const FIXTURES_FILE = path.join(__dirname, 'fixtures.json');

function generateGenreData(times = 10) {
  const fakeGenre = () => ({
    model: 'Genre',
    data: {
      id: cuid(),
      name: faker.random.word(),
      description: _.random() ? faker.company.catchPhrase() : null,
    },
  });

  return _.times(times, fakeGenre);
}

function generateAuthorData(times = 10) {
  const fakeAuthor = () => ({
    model: 'Author',
    data: {
      id: cuid(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    },
  });

  return _.times(times, fakeAuthor);
}

const generateBookData = (times = 10) => ([genres, authors]) => {
  const generateFakeSummary = () =>
    _.times(4, () => _.sample([faker.company.bs, faker.hacker.phrase])())
    .map(_.upperFirst)
    .join('. ')
    .slice(0, 255);

  const extractIds = collection => collection
    .map(c => c.data.id);

  const fakeBook = () => ({
    model: 'Book',
    data: {
      id: cuid(),
      title: _.startCase(faker.company.bs()),
      isbn: _.join([_.uniqueId(), _.random(1, 1000000000)], ''),
      summary: generateFakeSummary(),
      authors: _.take(_.shuffle(extractIds(authors)), _.random(1, 3)),
      genres: _.take(_.shuffle(extractIds(genres)), _.random(1, 5)),
    },
  });

  return _.times(times, fakeBook);
};

const writeToFile = (fileName, data) => fs.writeFileSync(
  fileName,
  JSON.stringify(data, null, 2),
);

const generateAndWriteFile = () => {
  const genres = generateGenreData();
  const authors = generateAuthorData();

  const books = generateBookData()([genres, authors]);

  const allData = [...genres, ...authors, ...books];

  try {
    writeToFile(FIXTURES_FILE, allData);
    process.stdout.write('Successfully generated data.\n');
  } catch (e) {
    process.stderr.write('Unable to generate data\n');
    throw e;
  }
};

if (fs.existsSync(FIXTURES_FILE)) {
  try {
    const data = fs.readFileSync(FIXTURES_FILE);
    if (data && data.length) {
      process.stdout.write('Valid fixtures data already exists. ');
      process.stdout.write('Manually delete it and try again.\n');
    } else {
      generateAndWriteFile();
    }
  } catch (e) {
    generateAndWriteFile();
  }
} else {
  generateAndWriteFile();
}
