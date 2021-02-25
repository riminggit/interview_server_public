/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TagModal = app.model.define('tag', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "标签数据id"
        },
        name: {
            type: STRING(50),
            allowNull: true,
            comment: "标签名"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'tag',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TagModal.associate = function () {
        app.model.TagModal.belongsTo(app.model.KnowledgeModal, { foreignKey: 'id', sourceKey: 'id',});
        app.model.TagModal.belongsTo(app.model.TopicTagModal, { foreignKey: 'id', sourceKey: 'id' });
    }

    return TagModal
};
