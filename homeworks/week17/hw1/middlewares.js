const mw = {
  checkLogin(req, res, next) {
    if (!req.session.userName) {
      res.redirect('/')
    } else {
      next()
    }
  }
}

module.exports = mw
