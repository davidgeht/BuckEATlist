// Middleware for restricting routes a user is not allowed to visit if not logged in

module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    //console.log('req.user = ', req.user);
    if (req.user) {
      //console.log('authentication successful');
      //console.log(next);
      next();
    } else {
    // If the user isn't logged in, redirect them to the login page
    //console.log('Authentication unsuccessful')
    return res.redirect("/login");
    }
  };
  