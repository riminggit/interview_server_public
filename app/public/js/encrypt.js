//
// 用于加密和解密用户密码
// app\public\js\encrypt.js
//

const fs = require("fs");
const path = require("path");
const JSEncrypt = require("node-jsencrypt");

/**
 * Encrypt with the public key...
 * @param {String} text
 * @param {String} publicKey
 * @returns ciphertext
 */
exports.rsaEncrypt = text => {
  const _publicKey = fs.readFileSync(
    path.join(__dirname, "./../files/ssh-key/rsa_public_key.pem")
  );
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(_publicKey.toString());
  let encrypted = encrypt.encrypt(text);
  return encrypted;
};

/**
 * Decrypt with the private key...
 * @param {String} ciphertext
 * @param {String} privateKey
 * @returns text
 */
exports.rsaDecrypt = ciphertext => {
  const _privateKey = fs.readFileSync(
    path.join(__dirname, "./../files/ssh-key/rsa_private_key.pem")
  ); // 公钥，看后面生成方法
  let decrypt = new JSEncrypt();
  decrypt.setPrivateKey(_privateKey.toString());
  let uncrypted = decrypt.decrypt(ciphertext);
  return uncrypted;
};

exports.getPublicKey = () => {
  let _publicKey = fs.readFileSync(
    path.join(__dirname, "./../files/ssh-key/rsa_public_key.pem")
  );
  _publicKey = _publicKey.toString();
  _publicKey = _publicKey.split("\r\n");
  _publicKey = _publicKey.join("");

  return _publicKey.toString();
};
