const jwt = require('jsonwebtoken');

let checkJWT = (req, res, next) => {
  //* Read the token from the request header
  let headerValue = req.get('Authorization');
  let signedToken;

  if (headerValue) {
    //* Create an array of the headerValue by splitting it on the space.
    let parts = headerValue.split(' ');
    //* The signedToken is set to the value of the 2nd item in the array.
    signedToken = parts[1];
  }

  //* Check to see if there is a signed token. If not we send a 403 status code.
  if (!signedToken) {
    console.log('Missing the signed token');
    res.sendStatus(403);
    return;
  }

  try {
    let unsigned = jwt.verify(signedToken, process.env.JWT_SECRET);
    //* Adding the unsigned to the request object and setting its value to the
    //*  userInfo variable.
    console.log(unsigned);
    req.userInfo = unsigned;
    next();
  } catch (error) {
    //* If the token is bad for any reason we will send a 403 status code
    console.log(`Failed to verify the token: ${error}`);
    res.sendStatus(403);
  }
};

module.exports = { checkJWT };
