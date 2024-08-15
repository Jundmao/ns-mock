# ds-mock

dx mock工具，将`/data`、`/data.json`格式的api请求映射到本地的`.js`或者`.json`文件

## 使用方式

```
const dxMock = require('ds-mock')

// 在webpack的配置上加入
devServer: {
  before (app) {
    dxMock(app, { root: path.join(__dirname, 'api') })
  }
}
```

接下来在请求`/data`或`/data.json`时，会依次查找root目录下的`.js`、`.json`文件，json文件直接返回数据即可，js文件的使用格式是

```
module.exports = function(req, res) {
  return {
    "success": true,
    "data": "data"
  }
}
```

参见api目录下的示例

## 优点

* 使用简单
* 直接基于webpack-dev-server底层的express，能满足大部分使用场景
* 自动清除root目录下的node require缓存