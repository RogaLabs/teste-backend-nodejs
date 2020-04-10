import Sequelize, { Model } from 'sequelize';

class DenunciationIncident extends Model {
  static init(sequelize) {
    super.init(
      {
        latitude: Sequelize.DOUBLE,
        longitude: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'denunciant',
      as: 'denunciante',
    });
    this.belongsTo(models.Incident, {
      foreignKey: 'incident',
      as: 'denuncia',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'address',
      as: 'endereco',
    });
  }
}

export default DenunciationIncident;
