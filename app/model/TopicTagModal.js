/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TopicTagModal = app.model.define('topic_tag', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "题目标签数据id"
        },
        topic_id: {
            type: INTEGER,
            allowNull: true,
            comment: "对应题目id"
        },
        tag_id: {
            type: INTEGER,
            allowNull: true
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'topic_tag',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TopicTagModal.associate = function () {
        app.model.TopicTagModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', sourceKey: 'id' });
        app.model.TopicTagModal.belongsTo(app.model.TagModal, { foreignKey: 'tag_id', targetKey: 'id' });

        app.model.TopicTagModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return TopicTagModal
};
