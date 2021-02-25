/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const KnowledgeModal = app.model.define('knowledge', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "知识点id"
        },
        title: {
            type: STRING(255),
            allowNull: true,
            comment: "知识点标题"
        },
        content: {
            type: TEXT,
            allowNull: true,
            comment: "知识点内容"
        },
        tag_id: {
            type: INTEGER,
            allowNull: true,
            comment: "相关标签id"
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
        tableName: 'knowledge',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    KnowledgeModal.associate = function () {
        app.model.KnowledgeModal.belongsTo(app.model.TagModal, { foreignKey: 'tag_id', targetKey: 'id' });
        app.model.KnowledgeModal.belongsTo(app.model.TopicKnowledgeModal, { foreignKey: 'id', sourceKey: 'id' });
    }

    return KnowledgeModal
};
