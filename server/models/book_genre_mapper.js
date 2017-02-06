export const schema = dataTypes => ({
  genreId: {
    type: dataTypes.STRING(25),
  },
  bookId: {
    type: dataTypes.STRING(25),
  },
});

export default function BookGenreMapper(sequelize, DataTypes) {
  return sequelize.define('book_genre_mapper', schema(DataTypes), {
    tableName: 'book_genre_mapper',
  });
}
