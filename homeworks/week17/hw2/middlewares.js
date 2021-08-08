const mw = {
  checkLogin(req, res, next) {
    if (!req.session.username) {
      res.redirect('/')
    } else {
      next()
    }
  }
}

module.exports = mw
