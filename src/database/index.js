import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Incident from '../app/models/Incident';
import Address from '../app/models/Address';
import DenunciationIncident from '../app/models/DenunciationIncident';

const models = [User, Incident, Address, DenunciationIncident];

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
