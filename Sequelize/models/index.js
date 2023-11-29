const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize);
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

const { Op } = require("sequelize");

User.findAll({
  attributes: ["id", "name"],
  where: {
    [Op.or]: [{ married: false }, { age: { [Op.gt]: 30 } }],
  },
});

module.exports = db;
