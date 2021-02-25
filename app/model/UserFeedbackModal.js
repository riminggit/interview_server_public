/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserFeedbackModal = app.model.define('user_feedback', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "用户反馈数据"
        },
        user_id: {
            type: INTEGER,
            allowNull: true
        },
        topic_id: {
            type: INTEGER,
            allowNull: true,
            comment: "对应题目id"
        },
        content: {
            type: TEXT,
            allowNull: true,
            comment: "反馈内容"
        },
        create_at: {
            type: DATE,
            allowNull: true,
            comment: "收藏时间"
        },
        grade: {
            type: TINYINT,
            allowNull: true,
            comment: "分数"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'user_feedback',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserFeedbackModal.associate = function () {

    }

    return UserFeedbackModal
};
