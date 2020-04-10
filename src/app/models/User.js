import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf_number: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
