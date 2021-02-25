/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TopicTypeModal = app.model.define('topic_type', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "题目类型数据ID，分类下的类型，classify下的分类"
        },
        topic_id: {
            type: INTEGER,
            allowNull: true
        },
        type_id: {
            type: INTEGER,
            allowNull: true
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'topic_type',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TopicTypeModal.associate = function () {
        app.model.TopicTypeModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', sourceKey: 'id' });
        app.model.TopicTypeModal.belongsTo(app.model.TypeModal, { foreignKey: 'type_id', targetKey: 'id' });

        app.model.TopicTypeModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return TopicTypeModal
};
