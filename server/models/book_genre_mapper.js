export const schema = dataTypes => ({
  genreId: {
    type: dataTypes.INTEGER,
  },
  bookId: {
    type: dataTypes.INTEGER,
  },
});

export default function BookGenreMapper(sequelize, DataTypes) {
  return sequelize.define('book_genre_mapper', schema(DataTypes), {
    tableName: 'book_genre_mapper',
  });
}
