import Sequelize, { STRING, INTEGER } from 'sequelize';
import { sequelize } from './index';
import Business from './business';

class Category extends Sequelize.Model {}

Category.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
  },
  {
    sequelize: sequelize,
    timestamps: true,
    version: true,
    modelName: 'category',
  }
);

export default Category;
