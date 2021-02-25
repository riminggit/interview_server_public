'use strict';

// module.exports = {
//   // 在执行数据库升级时调用的函数，创建 users 表
//   up: async (queryInterface, Sequelize) => {
//     const { INTEGER, DATE, STRING } = Sequelize;
    
//     await queryInterface.createTable('workOrder', {
//       workOrderNum: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       requiredTime:{ type: DATE, },           //需求时间,抓取提交时的系统时间
//       finishTime:{ type: DATE, },             //实际完成时间,实际流程完结时侯的时间
//       expectFinishTime:{ type: DATE, },       //期望完成时间,需求人期望完成的时间
//       scheduleTime:{ type: DATE, },           //排期时间,
//       priority:INTEGER,                       //优先级，P，1，2，3，4
//       creativeName:STRING(50),                //创意名称
//       projectName:STRING(50),                 //项目名称
//       stylist:STRING(30),                     //设计师，从其他后端拿取，在分配的时候存进
//       requireState:INTEGER,                   //状态， 
//       auditVideoUrl:STRING,                   //需求管理审核视频链接
//       requireDescription:STRING,              //需求描述
//       creativeId:{                            //创意ID
//         type: INTEGER, 
//       },
//       typeId:{                                 //风格ID
//         type: INTEGER, 
//       },
//       creativeDescriptionSoul:STRING,          //魂
//       creativeDescriptionBone:STRING,          //骨
//       creativeDescriptionMeat:STRING,          //肉
//       creativeDescriptionKind:STRING,          //色
//       attachmentLink:STRING,                   //附件链接
//       stylistProductionUrl:STRING,             //设计师提交的作品Url

//     });

//     await queryInterface.createTable('creativeTable', {    //创意表，用于记录创意类型
//       creativeId: { type: INTEGER, primaryKey: true, autoIncrement: true },  //创意ID
//       creativeName:STRING(20),                                               //创意名称
//       creativestate:INTEGER,                                                 //状态,状态1为显示，状态2为垃圾桶，状态3则隐藏，不返回给前端
//     });

//     await queryInterface.createTable('typeTable', {    //风格表，用于记录风格
//       typeId: { type: INTEGER, primaryKey: true, autoIncrement: true },  //风格ID
//       typeName:STRING(20),                                               //风格名称
//       typestate:INTEGER,                                                 //状态,状态1为显示，状态2为垃圾桶，状态3则隐藏，不返回给前端
//     });

//     await queryInterface.createTable('historyRecordTable', {   //历史记录表，记录对应的历史操作
//       historyId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       workOrderNum: { 
//         type: INTEGER, 
//         // references: {
//         //   model: 'workOrder',
//         //   key: 'workOrderNum'
//         // },
//         // onUpdate: 'cascade',
//         // onDelete: 'cascade' 
//       },
//       operateTime:{ type: DATE, },                       //行为操作的时间
//       operater:INTEGER,                                  //操作者ID
//       behavior:INTEGER,                                  //行为，操作
//       byTheOperator:INTEGER,                             //被操作者
//       remark:STRING,                                     //备注信息

//     });

//     await queryInterface.createTable('roleTable', {            //角色表，如果新登陆有一个无记录角色则新增为最低权限角色
//       roleId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       roleLevel:INTEGER,
      

      
//     });

//     await queryInterface.createTable('authorityTable', {      //权限表，如果新登陆有一个无记录角色则新增为最低权限角色
//       roleId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       authority:INTEGER, 
//       projectId:INTEGER,                                      //项目ID  
//     });

//     await queryInterface.createTable('projectTable', {        //项目表，如果新登陆有一个无记录角色则新增为最低权限角色
//       projectId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       projectName:STRING(50),                                 //项目名称    
//     });

//     // await queryInterface.createTable('behaviorTable', {    //行为表，用于记录行为信息，指派，创建，发布之类的行为
//     //   behaviorId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//     //   behaviorTime:{ type: DATE, },                      //行为操作的时间
//     //   requireState:INTEGER,                              //状态， 
//     // });

//     await queryInterface.createTable('materialTable', {    //素材表(创意)
//       materialId: { type: INTEGER, primaryKey: true, autoIncrement: true },
//       materialName:STRING(30),                            //创意名 
//     });





//   },
//   // 在执行数据库降级时调用的函数，删除 users 表
//   down: async queryInterface => {
//     await queryInterface.dropTable('workOrder');
//     await queryInterface.dropTable('creativeTable');
//     await queryInterface.dropTable('typeTable');
//     await queryInterface.dropTable('historyRecordTable');
//     await queryInterface.dropTable('roleTable');
//     await queryInterface.dropTable('authorityTable');
//     await queryInterface.dropTable('materialTable');
//   },
// };
