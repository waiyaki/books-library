import cuid from 'cuid';

export const schema = dataTypes => ({
  id: {
    type: dataTypes.STRING(25),
    primaryKey: true,
    defaultValue: () => cuid(),
  },
  name: {
    type: dataTypes.STRING(64),
    allowNull: false,
  },
});


export default function Author(sequelize, DataTypes) {
  return sequelize.define('author', schema(DataTypes), {
    tableName: 'authors',
    classMethods: {
      associate({ Author: author, Book }) {
        author.belongsToMany(Book, {
          through: 'author_book_mapper',
          foreignKey: 'authorId',
          otherKey: 'bookId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
}
