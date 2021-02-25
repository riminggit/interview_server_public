/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const TopicCompanyModal = app.model.define('topic_company', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "题目所属公司数据id"
        },
        topic_id: {
            type: INTEGER,
            allowNull: true,
            comment: "题目对应id"
        },
        company_id: {
            type: INTEGER,
            allowNull: true,
            comment: "对应公司id"
        },
        topic_time: {
            type: STRING,
            allowNull: true,
            comment: "题目时间"
        },
        is_use: {
            type: TINYINT,
            allowNull: true,
            comment: "是否使用，0删除，1使用"
        }
    }, {
        tableName: 'topic_company',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    TopicCompanyModal.associate = function () {
        app.model.TopicCompanyModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', sourceKey: 'id' });
        app.model.TopicCompanyModal.belongsTo(app.model.CompanyModal, { foreignKey: 'company_id', targetKey: 'id' });

        app.model.TopicCompanyModal.belongsTo(app.model.TopicModal, { foreignKey: 'topic_id', targetKey: 'id' });
    }

    return TopicCompanyModal
};
