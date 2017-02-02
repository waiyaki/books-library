export const schema = dataTypes => ({
  authorId: {
    type: dataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: dataTypes.INTEGER,
    allowNull: false,
  },
});

export default function AuthorBookMapper(sequelize, DataTypes) {
  return sequelize.define('author_book_mapper', schema(DataTypes), {
    tableName: 'author_book_mapper',
  });
}
