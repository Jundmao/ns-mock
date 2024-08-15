module.exports = function(req, res) {
  return {
    "success": true,
    "data": req.path
  }
}