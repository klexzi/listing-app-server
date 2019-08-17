import bcrypt from 'bcrypt';
import { Model, INTEGER, STRING } from 'sequelize';
import { sequelize } from './index';

class Admin extends Model {
  async _hashPassword() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  }

  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  static async findByLogin(login) {
    let admin = await Admin.findOne({
      where: { email: login },
    });

    return admin;
  }
}

Admin.init(
  {
    id: {
      type: INTEGER,
      unique: true,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    timestamps: true,
    modelName: 'admin',
    version: true,
    sequelize,
  }
);

Admin.beforeSave(async admin => {
  admin.password = await admin._hashPassword();
});
export default Admin;
