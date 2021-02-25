'use strict';


exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};
/** @type Egg.EggPlugin */
// module.exports = {
//   jwt: {
//     enable: true,
//     package: 'egg-jwt',
//   },
//   cors: {
//     enable: true,
//     package: 'egg-cors',
//   },
// };
module.exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
module.exports.cors = {
  enable: true,
  package: 'egg-cors',
};
// config/plugin.js
module.exports.passport = {
  enable: true,
  package: 'egg-passport',
};

//eggjs的参数校验模块egg-validate
module.exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// {app_root}/config/plugin.js
exports.io = {
  enable: true,
  package: 'egg-socket.io',
};

// exports.sse = {
//   enable: true,
//   package: 'egg-sse',
// };
