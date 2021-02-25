'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, io } = app;

  router.post(`/api/login`, controller.userController.login);
  router.post(`/api/pcLogin`, controller.userController.pcLogin);
  router.get(`/api/currentUser`, controller.userController.currentUser);

  //查询类接口
  router.post(`/api/queryUser`, controller.userController.queryUser);//查询用户信息
  router.post(`/api/queryClassify`, controller.classifyController.queryClassify);//查询分类
  router.post(`/api/queryCompany`, controller.companyController.queryCompany);//查询公司数据
  router.post(`/api/queryKnowledge`, controller.knowledgeController.queryKnowledge);//查询知识点数据
  router.post(`/api/queryTag`, controller.tagController.queryTag);//查询标签
  router.post(`/api/queryType`, controller.typeController.queryType);//查询题目分类下的类型
  router.post(`/api/queryUserAddTopic`, controller.userAddTopicController.queryUserAddTopic);//查询用户自己新增的数据
  router.post(`/api/queryUserCollect`,controller.userCollectController.queryUserCollect);//查询用户收藏数据
  router.post(`/api/queryUserFeedback`,controller.userFeedbackController.queryUserFeedback);//查询用户反馈
  router.post(`/api/queryUserInterview`,controller.userInterviewController.queryUserInterview);//查询面试记录
  router.post(`/api/queryTopic`, controller.topicController.queryTopic);// 查询题目

  //新增或更新类接口
  router.post(`/api/addCompany`, controller.companyController.addCompany);//新增公司数据
  router.post(`/api/addKnowledge`, controller.knowledgeController.addKnowledge);//新增知识点数据
  router.post(`/api/addTag`, controller.tagController.addTag);//新增标签
  router.post(`/api/addType`, controller.typeController.addType);//新增题目分类下的类型
  router.post(`/api/userAddTopic`,controller.userAddTopicController.userAddTopic);//用户添加自己的题目
  router.post(`/api/userAddCollect`,controller.userCollectController.userAddCollect);//新增用户收藏数据
  router.post(`/api/addUserFeedback`,controller.userFeedbackController.addUserFeedback);//查询用户反馈
  router.post(`/api/addUserInterview`,controller.userInterviewController.addUserInterview);//新增面试记录
  router.post(`/api/updateUserInterview`,controller.userInterviewController.updateUserInterview);//修改面试记录
  router.post(`/api/addTopic`, controller.topicController.addTopic);// 新增题目
  router.post(`/api/updateTopic`, controller.topicController.updateTopic);// 修改题目

  //删除类接口
  router.post(`/api/delUserAddTopic`, controller.userAddTopicController.delUserAddTopic);//删除用户自己添加的数据
  router.post(`/api/delUserCollect`,controller.userCollectController.delUserCollect);//删除用户收藏数据
  router.post(`/api/delUserFeedback`,controller.userFeedbackController.delUserFeedback);//查询用户反馈
  router.post(`/api/delUserInterview`,controller.userInterviewController.delUserInterview);//修改面试记录
  router.post(`/api/delTopic`, controller.topicController.delTopic);// 删除题目

  //功能性接口
  router.post(`/api/userReadThisTopic`, controller.topicController.userReadThisTopic);//用户已读当前题目




};
