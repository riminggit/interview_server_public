/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserTopicReadModal = app.model.define('user_topic_read', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "用户看过的题目数据id"
        },
        user_id: {
            type: INTEGER,
            allowNull: true,
            comment: "用户id"
        },
        topic_id: {
            type: INTEGER,
            allowNull: true,
            comment: "题目id"
        },
        is_read: {
            type: TINYINT,
            allowNull: true,
            comment: "是否阅读 0 未读  1已读"
        },
        create_at: {
            type: DATE,
            allowNull: true,
            comment: "添加时间"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'user_topic_read',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserTopicReadModal.associate = function () {

    }

    return UserTopicReadModal
};
