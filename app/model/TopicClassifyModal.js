/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TopicClassifyModal = app.model.define('topic_classify', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "题目分类数据id"
        },
        topic_id: {
            type: INTEGER,
            allowNull: true,
            comment: "对应题目id"
        },
        classify_id: {
            type: INTEGER,
            allowNull: true,
            comment: "分类数据id"
        },
        is_use: {
            type: TINYINT,
            allowNull: true
        }
    }, {
        tableName: 'topic_classify',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TopicClassifyModal.associate = function () {
        app.model.TopicClassifyModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', sourceKey: 'id' });
        app.model.TopicClassifyModal.belongsTo(app.model.ClassifyModal, { foreignKey: 'classify_id', targetKey: 'id' });

        app.model.TopicClassifyModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return TopicClassifyModal
};
