/**
 * dx mock
 */
const path = require('path')
const fs = require('fs')

const handlers = [
  {
    ext: '.js',
    handler: function(file, req, res) {
      res.json(require(file)(req, res))
    }
  },

  {
    ext: '.json',
    handler: function(file, req, res) {
      res.json(require(file))
    }
  }
]

module.exports = function(app, options={}) {
  const root = options.root

  app.use(function(req, res, next) {
    /**
     * /api/a
     * /api/a.json
     */
    const ext = path.extname(req.path)
    let p = path.join(root, req.path)

    // 先统一去掉后缀名
    p = p.slice(0, p.length - ext.length)

    const match = handlers.some(item => {
      const file = p + item.ext

      if (fs.existsSync(file)) {
        cleanCache(file)
        item.handler(file, req, res)
        return true
      }

      return false
    })

    if (!match) {
      next()
    }
  })
}

// http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping/
function cleanCache(modulePath) {
  const module = require.cache[modulePath]
  if (!module) {
    return
  }

  if (module.parent) {
    module.parent.children.splice(module.parent.children.indexOf(module), 1)
  }

  delete require.cache[modulePath]
}