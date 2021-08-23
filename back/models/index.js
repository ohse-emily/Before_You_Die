'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const Users = require('./users');
const Lastwords = require('./lastwords');
const Messages = require('./messages');
const Chat = require('./chat')
const Chatting = require('./chatting')

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = Users;
db.Lastwords = Lastwords;
db.Messages = Messages;
db.Chat = Chat;
db.Chatting = Chatting;

Users.init(sequelize);
Lastwords.init(sequelize);
Messages.init(sequelize);
Chat.init(sequelize);
Chatting.init(sequelize);

module.exports = db;
