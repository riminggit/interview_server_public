/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TopicKnowledgeModal = app.model.define('topic_knowledge', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true
        },
        topic_id: {
            type: INTEGER,
            allowNull: true
        },
        knowledge_id: {
            type: INTEGER,
            allowNull: true
        },
        tag_id: {
            type: INTEGER,
            allowNull: true,
            comment: "相关标签id"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'topic_knowledge',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TopicKnowledgeModal.associate = function () {
        app.model.TopicKnowledgeModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', sourceKey: 'id' });
        app.model.TopicKnowledgeModal.belongsTo(app.model.KnowledgeModal, { foreignKey: 'knowledge_id', targetKey: 'id' });

        app.model.TopicKnowledgeModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return TopicKnowledgeModal
};
