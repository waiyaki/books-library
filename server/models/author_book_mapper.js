export const schema = dataTypes => ({
  authorId: {
    type: dataTypes.STRING(25),
    allowNull: false,
  },
  bookId: {
    type: dataTypes.STRING(25),
    allowNull: false,
  },
});

export default function AuthorBookMapper(sequelize, DataTypes) {
  return sequelize.define('author_book_mapper', schema(DataTypes), {
    tableName: 'author_book_mapper',
  });
}
