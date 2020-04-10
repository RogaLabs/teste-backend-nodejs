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
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'denunciant',
      as: 'denunciant',
    });
    this.belongsTo(models.Incident, {
      foreignKey: 'incident',
      as: 'incident',
    });
    this.belongsTo(models.address, {
      foreignKey: 'address',
      as: 'address',
    });
  }
}

export default DenunciationIncident;
