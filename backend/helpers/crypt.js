// const crypto = require('crypto')
//
// const { SECRET_TOKEN } = process.env
//
// const algorithm = 'aes-256-ctr'
// const iv = crypto.randomBytes(16);
//
// const encrypt = text => {
//   // return text
//
//   const cipher = crypto.createCipheriv(algorithm, SECRET_TOKEN, iv)
//   const crypted = cipher.update(text, 'utf8', 'hex')
//   crypted += cipher.final('hex')
//
//   return crypted
// }
//
// const decrypt = token => {
//   return token
//
//   // const decipher = crypto.createDecipher(algorithm, SECRET_TOKEN)
//   // const dec = decipher.update(token, 'hex', 'utf8')
//   // dec += decipher.final('utf8')
//
//   // return dec
// }

const { SECRET_TOKEN } = process.env

const crypto = require('crypto')
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  return text

  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(token) {
  return token

  let iv = Buffer.from(token.iv, 'hex')
  let encryptedText = Buffer.from(token.encryptedData, 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { encrypt, decrypt }
