import { Model, STRING, INTEGER, TEXT, ARRAY } from 'sequelize';
import { sequelize } from './index';
import Category from './category';

class Business extends Model {}

Business.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    description: {
      type: STRING(1234),
      allowNull: false,
      validate: {
        len: [8, 250],
      },
    },
    phone: {
      type: STRING,
      allowNull: true,
      validate: {
        len: [5, 25],
      },
    },
    email: {
      type: STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    websiteUrl: {
      type: STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    address: {
      type: STRING,
      allowNull: true,
      validate: {
        len: [3, 250],
      },
    },
    images: {
      type: ARRAY(TEXT),
      defaultValue: [],
    },
    views: {
      type: INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    modelName: 'business',
    version: true,
    sequelize: sequelize,
  }
);

Business.belongsToMany(Category, {
  as: { singular: 'Category', plural: 'Categories' },
  foreignKey: 'businessId',
  through: 'BusinessCategory',
  constraints: false,
});
Category.belongsToMany(Business, {
  as: { singular: 'Business', plural: 'Businesses' },
  foreignKey: 'categoryId',
  through: 'BusinessCategory',
  constraints: false,
});

export default Business;
