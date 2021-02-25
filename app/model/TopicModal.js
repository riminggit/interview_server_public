/* jshint indent: 2 */

module.exports = app => {
  const { TEXT, INTEGER, NOW, CHAR, STRING, DATE, TINYINT } = app.Sequelize;
  const TopicModal = app.model.define('topic', {
    id: {
      autoIncrement: true,
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "id"
    },
    title: {
      type: STRING(255),
      allowNull: true,
      comment: "题目标题"
    },
    analysis: {
      type: TEXT,
      allowNull: true,
      comment: "题解，内容为富文本"
    },
    degree: {
      type: TINYINT,
      allowNull: true,
      comment: "难度，简单：0，中等：1，难：2，极难：3"
    },
    level: {
      type: TINYINT,
      allowNull: true,
      comment: "1 初级 , 2 中级 , 3 高级 , 4 资深 ,5 专家 , 6 资深专家 , 7 研究员"
    },
    is_base_topic: {
      type: TINYINT,
      allowNull: true,
      comment: "0 否  1是"
    },
    is_important_topic: {
      type: TINYINT,
      allowNull: true,
      comment: "0 否  1是"
    },
    create_at: {
      type: DATE,
      allowNull: true,
      comment: "添加时间"
    },
    is_use: {
      type: TINYINT,
      allowNull: true,
      comment: "是否删除:0 删除 1未删除"
    }
  }, {
    tableName: 'topic',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  });
  TopicModal.associate = function () {
    app.model.TopicModal.belongsTo(app.model.UserCollectTopicModal, { foreignKey: 'id', sourceKey: 'id',});
    app.model.TopicModal.hasMany(app.model.TopicClassifyModal, { foreignKey: 'id', targetKey: 'topic_id' });
    app.model.TopicModal.hasMany(app.model.TopicCompanyModal, { foreignKey: 'id', targetKey: 'topic_id' });
    app.model.TopicModal.hasMany(app.model.TopicKnowledgeModal, { foreignKey: 'id', targetKey: 'topic_id' });
    app.model.TopicModal.hasMany(app.model.TopicTagModal, { foreignKey: 'id', targetKey: 'topic_id' });
    app.model.TopicModal.hasMany(app.model.TopicTypeModal, { foreignKey: 'id', targetKey: 'topic_id' });

    app.model.TopicModal.belongsTo(app.model.TopicClassifyModal, { foreignKey: 'id', sourceKey: 'id',});
    app.model.TopicModal.belongsTo(app.model.TopicCompanyModal, { foreignKey: 'id', sourceKey: 'id',});
    app.model.TopicModal.belongsTo(app.model.TopicKnowledgeModal, { foreignKey: 'id', sourceKey: 'id',});
    app.model.TopicModal.belongsTo(app.model.TopicTagModal, { foreignKey: 'id', sourceKey: 'id',});
    app.model.TopicModal.belongsTo(app.model.TopicTypeModal, { foreignKey: 'id', sourceKey: 'id',});
  }

  return TopicModal
};
