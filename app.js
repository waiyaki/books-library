import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { Book, Author, Genre } from './server/models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

app.post('/api/books', async (req, res) => {
  const { authorId, genreId, ...fields } = req.body;
  let author;
  let genre;
  if (authorId) {
    author = await Author.findById(authorId);
  }
  if (genreId) {
    genre = await Genre.findById(genreId);
  }

  try {
    const book = await Book.create(fields);
    if (author) {
      await book.setAuthors([author]);
    }
    if (genre) {
      await book.setGenres([genre]);
    }

    return Book
      .findOne({
        where: {
          id: book.id,
        },
        include: [Genre, Author],
      })
      .then(res.status(201).send.bind(res));
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.post('/api/authors', (req, res) => {
  Author.create(req.body)
    .then(author => res.status(201).send(author))
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.post('/api/genres', (req, res) => {
  Genre.create(req.body)
    .then(genre => res.status(201).send(genre))
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.use('*', (req, res) => res.send({
  message: 'Welcome',
}));

export default app;
