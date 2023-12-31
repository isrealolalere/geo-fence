const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization')
  if(!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split("Bearer ")[1]
  if(!token || token === ''){
    req.isAuth = false
    return next()
  }
  let decodedToken
  try{
    decodedToken = jwt.verify(token, process.env.JWT_SECRET) // Move variable to env
  }catch (err) {
    req.isAuth = false
    return next()
  }

  if(!decodedToken){
    req.isAuth = false
    return next()
  }

  req.isAuth = true
  req.userId = decodedToken.userId
  next()

}