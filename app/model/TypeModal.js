/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TypeModal = app.model.define('type', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "分类下的类型"
        },
        name: {
            type: STRING(255),
            allowNull: true,
            comment: "类型名"
        },
        classify_id: {
            type: INTEGER,
            allowNull: true
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'type',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TypeModal.associate = function () {
        app.model.TypeModal.belongsTo(app.model.ClassifyModal, { foreignKey: 'classify_id', targetKey: 'id' });
        app.model.TypeModal.belongsTo(app.model.TopicTypeModal, { foreignKey: 'id', sourceKey: 'id' });
    }

    return TypeModal
};
