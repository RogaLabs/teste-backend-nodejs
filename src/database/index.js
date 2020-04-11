import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Incident from '../app/models/Incident';
import Address from '../app/models/Address';
import DenunciationsIncident from '../app/models/DenunciationsIncident';

const models = [User, Incident, Address, DenunciationsIncident];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
