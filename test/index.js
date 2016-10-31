var expect = require('chai').expect
var generator = require('../index')

describe('generateDeadline', function () {
  var nowInSec = Math.round(new Date().getTime() / 1000)

  it('generate 0s deadline', function () {
    var deadline = generator.generateDeadline(0)
    expect(deadline - nowInSec).to.be.equal(0)
  })

  it('generate 60s deadline', function () {
    var deadline = generator.generateDeadline(1000 * 60)
    expect(deadline - nowInSec).to.be.equal(60)
  })
})

describe('generatorPutPolicy', function () {
  var bucket = 'my-bucket'
  var key = 'sunflower.jpg'
  var deadline = 1451491200
  var returnBody = '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'

  it('generatePutPolicy with bucket, key, dealine, returnBody', function () {

    var putPolicy = generator.generatePutPolicy({
      bucket: bucket,
      key: key,
      deadline: deadline,
      returnBody: returnBody
    })
    expect(putPolicy.scope).to.equal('my-bucket:sunflower.jpg')
    expect(putPolicy.deadline).to.equal(deadline)
    expect(putPolicy.returnBody).to.equal(returnBody)
  })

  it('generatePutPolicy with bucket, deadline, returnBody, no key', function () {
    var putPolicy = generator.generatePutPolicy({
      bucket: bucket,
      deadline: deadline,
      returnBody: returnBody
    })
    expect(putPolicy.scope).to.equal('my-bucket')
    expect(putPolicy.deadline).to.equal(deadline)
    expect(putPolicy.returnBody).to.equal(returnBody)
  })

  it('default deadline is 1 day', function () {
    var nowInSec = Math.round(new Date().getTime() / 1000)
    var putPolicy = generator.generatePutPolicy({
      bucket: bucket,
      returnBody: returnBody
    })

    expect(putPolicy.deadline - nowInSec).to.equal(60 * 60 * 24)
  })
})

describe('generateUptoken', function () {
  var ACCESS_KEY = 'MY_ACCESS_KEY'
  var SECRET_KEY = 'MY_SECRET_KEY'

  it('generate uptoken with mock access key and secret key', function () {
    var putPolicy = generator.generatePutPolicy({
      bucket: 'my-bucket',
      key: 'sunflower.jpg',
      deadline: 1451491200,
      returnBody: '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'
    })
    var uptoken = generator.generateUptoken(ACCESS_KEY, SECRET_KEY, putPolicy)
    expect(uptoken).to.equal('MY_ACCESS_KEY:wQ4ofysef1R7IKnrziqtomqyDvI=:eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVybkJvZHkiOiJ7XCJuYW1lXCI6JChmbmFtZSksXCJzaXplXCI6JChmc2l6ZSksXCJ3XCI6JChpbWFnZUluZm8ud2lkdGgpLFwiaFwiOiQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6JChldGFnKX0ifQ==')
  })
})
