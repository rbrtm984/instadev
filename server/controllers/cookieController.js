const cookieController = {};

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  try {
    // Validate input
    if (typeof req.body.id !== 'string' || req.body.id.trim() === '') {
      throw new Error('Invalid input');
    }

    res.cookie('ssid', req.body.id, { maxAge: 30000, httpOnly: true });
    return next();
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while setting the cookie');
  }
}

cookieController.checkCookie = (req, res, next) => {
  try {
    const currSSID = req.cookies.ssid;
    console.log('curr cookie is', currSSID);

    // Validate cookie
    if (typeof currSSID !== 'string' || currSSID.trim() === '') {
      throw new Error('Invalid cookie');
    }

    if (currSSID) {
      return next();
    } else {
      res.redirect('http://localhost:3000/login');
    }
  } catch (error) {
    console.error(error);
    res.redirect('http://localhost:3000/login');
  }
}

module.exports = cookieController;