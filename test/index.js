var expect = require('chai').expect
var generator = require('../index')
var ACCESS_KEY = 'MY_ACCESS_KEY'
var SECRET_KEY = 'MY_SECRET_KEY'

describe('test qiniu-uptoken-generator', function () {
  
  it('generatePutPolicy with bucket, key, dealine, returnBody', function () {
    var deadline = 1451491200
    var returnBody = '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'
    var putPolicy = generator.generatePutPolicy({
      scope: 'my-bucket',
      key: 'sunflower.jpg',
      deadline: deadline,
      returnBody: returnBody
    })
    expect(uptoken.scope).to.equal('my-bucket:sunflower.jpg')
    expect(uptoken.deadline).to.equal(deadline)
    expect(uptoken.returnBody).to.equal(returnBody)
  })

  it('test', function () {
    var putPolicy = generator.generatePutPolicy({
      scope: 'my-bucket',
      key: 'sunflower.jpg',
      deadline: 1451491200,
      returnBody: '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'
    })
    var uptoken = generator.generateUptoken(ACCESS_KEY, SECRET_KEY, putPolicy)
    expect(uptoken).to.equal('MY_ACCESS_KEY:wQ4ofysef1R7IKnrziqtomqyDvI=:eyJzY29wZSI6Im15LWJ1Y2tldDpzdW5mbG93ZXIuanBnIiwiZGVhZGxpbmUiOjE0NTE0OTEyMDAsInJldHVybkJvZHkiOiJ7XCJuYW1lXCI6JChmbmFtZSksXCJzaXplXCI6JChmc2l6ZSksXCJ3XCI6JChpbWFnZUluZm8ud2lkdGgpLFwiaFwiOiQoaW1hZ2VJbmZvLmhlaWdodCksXCJoYXNoXCI6JChldGFnKX0ifQ==')
  })
})
