const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
      res.redirect('/ingredients');
    }
    next();
  }
  
  // if an already logged in user tries to access the login page it
  // redirects the user to the home page
const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
      next();
    }
    res.redirect("/log-in");
  }

module.exports = {
    isLoggedIn,
    isLoggedOut,
  }