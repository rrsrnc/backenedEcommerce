const jwt=require('jsonwebtoken')

const secretKey = 'rajeevecommerce';

const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header('accessToken');
  if (!token) {
      res.status(401).send({ error: "Please authenticate using a valid token" })
  }
  else{
    try {
        const data = jwt.verify(token, secretKey);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
  }
  

}


module.exports = fetchuser;