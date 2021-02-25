/* jshint indent: 2 */

module.exports = app => {
    const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
    const UserTopicReadModal = app.model.define('user', {
        id: {
            autoIncrement: true,
            type: INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "用户ID"
        },
        nick_name: {
            type: STRING(50),
            allowNull: true,
            comment: "用户昵称"
        },
        avatar_url: {
            type: STRING(255),
            allowNull: true,
            comment: "用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。"
        },
        gender: {
            type: TINYINT,
            allowNull: true,
            comment: "1时是男性，值为2时是女性，值为0时是未知"
        },
        city: {
            type: STRING(50),
            allowNull: true,
            comment: "\t用户所在城市"
        },
        province: {
            type: STRING(50),
            allowNull: true,
            comment: "用户所在省份"
        },
        country: {
            type: STRING(50),
            allowNull: true,
            comment: "用户所在国家"
        },
        language: {
            type: STRING(30),
            allowNull: true,
            comment: "\t用户的语言，简体中文为zh_CN"
        },
        rawdata: {
            type: STRING(255),
            allowNull: true,
            comment: "不包括敏感信息的原始数据字符串，用于计算签名。"
        },
        signature: {
            type: STRING(255),
            allowNull: true,
            comment: "使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息"
        },
        encrypteddata: {
            type: STRING(255),
            allowNull: true,
            comment: "包括敏感数据在内的完整用户信息的加密数据"
        },
        iv: {
            type: STRING(255),
            allowNull: true,
            comment: "加密算法的初始向量"
        }
    }, {
        tableName: 'user',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });
    UserTopicReadModal.associate = function () {

    }

    return UserTopicReadModal
};
