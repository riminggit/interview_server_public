/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const ClassifyModal = app.model.define('classify', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "分类数据id"
        },
        name: {
            type: STRING,
            allowNull: true,
            comment: "类型名：html5、css、js等"
        },
        img_url: {
            type: STRING,
            allowNull: true,
            comment: "类型url"
        },
        img_svg: {
            type: TEXT,
            allowNull: true,
            comment: "SVG"
        },
        is_use: {
            type: TINYINT,
            allowNull: true,
            comment: "是否删除:0 删除 1未删除"
        }

    }, {
        tableName: 'classify',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    ClassifyModal.associate = function () {
        app.model.ClassifyModal.belongsTo(app.model.TypeModal, { foreignKey: 'id', sourceKey: 'id',});
        app.model.ClassifyModal.belongsTo(app.model.TopicClassifyModal, { foreignKey: 'id', sourceKey: 'id' });
    }

    return ClassifyModal
};
