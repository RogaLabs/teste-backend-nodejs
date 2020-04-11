import Sequelize, { Model } from 'sequelize';

class DenunciationsIncident extends Model {
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
      foreignKey: 'denunciante',
    });
    this.belongsTo(models.Incident, {
      foreignKey: 'denuncia',
    });
    this.belongsTo(models.Address, {
      foreignKey: 'endereco',
    });
  }
}

export default DenunciationsIncident;
