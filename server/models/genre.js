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
  description: {
    type: dataTypes.STRING(255),
  },
  createdAt: {
    allowNull: false,
    type: dataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: dataTypes.DATE,
  },
});


export default function Genre(sequelize, DataTypes) {
  return sequelize.define('genre', schema(DataTypes), {
    tableName: 'genres',
    classMethods: {
      associate({ Genre: genre, Book }) {
        genre.belongsToMany(Book, {
          through: 'book_genre_mapper',
          foreignKey: 'genreId',
          otherKey: 'bookId',
          onDelete: 'CASCADE',
        });
      },
    },
  });
}
