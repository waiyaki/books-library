export const schema = dataTypes => ({
  title: {
    type: dataTypes.STRING(64),
    allowNull: false,
  },
  isbn: {
    type: dataTypes.STRING(13),
    allowNull: false,
    unique: true,
  },
  summary: {
    type: dataTypes.STRING(255),
  },
});

export default function Book(sequelize, DataTypes) {
  return sequelize.define('book', schema(DataTypes), {
    tableName: 'books',
    classMethods: {
      associate({ Book: book, Author, Genre }) {
        book.belongsToMany(Author, {
          through: 'author_book_mapper',
          foreignKey: 'bookId',
          otherKey: 'authorId',
        });
        book.belongsToMany(Genre, {
          through: 'book_genre_mapper',
          foreignKey: 'bookId',
          otherKey: 'genreId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
}
