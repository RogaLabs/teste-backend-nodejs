import Sequelize, { Model } from 'sequelize';

class Incident extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        descricao: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Incident;
