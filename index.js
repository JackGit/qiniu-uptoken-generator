var crypto = require('crypto')

exports.generateUptoken = function (accessKey, secretKey, putPolicyObject) {
  var policyJSON = JSON.stringify(putPolicyObject)
  var encodedPolicy = urlSafeBase64(base64(policyJSON))
  var encodedSign = urlSafeBase64(hmacSha1(secretKey, encodedPolicy))
  return [accessKey, encodedSign, encodedPolicy].join(':')
}

exports.generatePutPolicy = function (options) {
  return {
    scope: options.key ? options.bucket + ':' + options.key : options.bucket,
    deadline: options.deadline || exports.generateDeadline(options.expiresIn || 1000 * 60 * 60 * 24), // 1 day
    returnBody: options.returnBody || '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'
  }
}

exports.generateDeadline = function (expiresIn) {
  return Math.round((new Date().getTime() + expiresIn) / 1000)
}

function base64 (value) {
  return new Buffer(value).toString('base64')
}

function urlSafeBase64 (value) {
  return value.replace(/\//g, '_').replace(/\+/g, '-')
}

function hmacSha1 (key, value) {
  return crypto.createHmac('sha1', key).update(value).digest('base64')
}
