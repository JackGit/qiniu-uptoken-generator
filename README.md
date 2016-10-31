## description

you can use this in your node server to generate your qiniu uptoken

## install

```bash
npm i qiniu-uptoken-generator --save
```

## demo usage

```js
var generator = require('qiniu-uptoken-generator')
var ACCESS_KEY = 'MY_ACCESS_KEY'
var SECRET_KEY = 'MY_SECRET_KEY'

var putPolicy = generator.generatePutPolicy({
  bucket: 'my-bucket',
  key: 'sunflower.jpg',
  deadline: 1451491200, // you can use a unix timestamp for a future time
  // expiresIn: 1000 * 60 * 60, // or define a expiresIn in millisecond
  returnBody: '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag)}'
})

var uptoken = generator.generateUptoken(ACCESS_KEY, SECRET_KEY, putPolicy)
```

## more about qiniu uptoken

http://developer.qiniu.com/article/developer/security/upload-token.html
