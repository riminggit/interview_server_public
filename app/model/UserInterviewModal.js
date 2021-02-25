/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserInterviewModal = app.model.define('user_interview', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "用户面试数据id"
        },
        user_id: {
            type: INTEGER,
            allowNull: true
        },
        compony_name: {
            type: STRING(255),
            allowNull: true,
            comment: "公司名"
        },
        interview_time: {
            type: DATE,
            allowNull: true,
            comment: "面试时间"
        },
        interview_schedule: {
            type: STRING(50),
            allowNull: true,
            comment: "面试阶段"
        },
        interview_status: {
            type: TINYINT,
            allowNull: true,
            comment: "0 未开始 1进行中 2已完成"
        },
        interview_result: {
            type: STRING(50),
            allowNull: true,
            comment: "面试结果"
        },
        create_at: {
            type: DATE,
            allowNull: true,
            comment: "收藏时间"
        },
        is_use: {
            type: TINYINT,
            allowNull: true,
            comment: "0 删除 1使用"
        }
    }, {
        tableName: 'user_interview',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserInterviewModal.associate = function () {

    }

    return UserInterviewModal
};
