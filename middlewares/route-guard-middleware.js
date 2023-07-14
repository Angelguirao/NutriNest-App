const isLoggedOut = (req, res, next) => {
    if (!req.session.user) {
      return res.redirect('/log-in')
    }
    next()
  }
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
  const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      return res.redirect('/ingredients')
    }
    next()
  }

  module.exports = {
    isLoggedIn,
    isLoggedOut,
  }