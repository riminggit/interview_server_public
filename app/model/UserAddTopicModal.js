/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserAddTopicModal = app.model.define('user_add_topic', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "用户新增题目数据id"
          },
          user_id: {
            type:INTEGER,
            allowNull: true,
            comment: "用户id"
          },
          title: {
            type: STRING(255),
            allowNull: true,
            comment: "题目标题"
          },
          analysis: {
            type: TEXT,
            allowNull: true,
            comment: "分析"
          },
          degree: {
            type: TINYINT,
            allowNull: true,
            comment: "难度，简单：0，中等：1，难：2，极难：3难度"
          },
          create_at: {
            type: DATE,
            allowNull: true,
            comment: "创建时间"
          },
          is_important_topic: {
            type: TINYINT,
            allowNull: true,
            comment: "是否为重点题目 0 否 1是"
          },
          is_use: {
            type: TINYINT,
            allowNull: true
          }
    }, {
        tableName: 'user_add_topic',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserAddTopicModal.associate = function () {

    }

    return UserAddTopicModal
};
