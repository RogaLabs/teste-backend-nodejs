import Sequelize, { Model } from 'sequelize';

class Incident extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Incident;
