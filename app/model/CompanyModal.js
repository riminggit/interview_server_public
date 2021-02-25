/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const CompanyModal = app.model.define('company', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "is_use"
        },
        company_name: {
            type: STRING,
            allowNull: true,
            comment: "公司名"
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
            comment: "0 删除 1使用"
        }
    }, {
        tableName: 'company',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    CompanyModal.associate = function () {
        app.model.CompanyModal.belongsTo(app.model.TopicCompanyModal, { foreignKey: 'id', targetKey: 'id' });
        app.model.CompanyModal.belongsTo(app.model.TopicCompanyModal, { foreignKey: 'id', sourceKey: 'id' });
    }

    return CompanyModal
};
