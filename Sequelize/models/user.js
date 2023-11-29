const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  //User 모델은 SequelizeModel을 확장한 클래스로 선언
  static init(sequelize) {
    //테이블 설정
    return super.init(
      //첫 번째 인수가 테이블 컬럼에 대한 설정, 두 번째 인수가 테이블 자체에 대한 설정.
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
          uniqye: true,
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoide: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    //모델들 간의 관계 설정.
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
};
