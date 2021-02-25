/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserCollectTopicModal = app.model.define('user_collect_topic', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "题目收藏数据id"
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
        create_at: {
            type: DATE,
            allowNull: true,
            comment: "收藏时间"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'user_collect_topic',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserCollectTopicModal.associate = function () {
        app.model.UserCollectTopicModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return UserCollectTopicModal
};
