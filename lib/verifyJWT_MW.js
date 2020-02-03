import nodeCookie from 'node-cookie'

import verifyJWT from './verifyJWT'

const verifyJWT_MW = (req, res, next) => {
  const token = nodeCookie.get(req, 'token')

  verifyJWT(token)
    .then((decodedToken) => {
      req.user = decodedToken.user
      next()
    })
    .catch((err) => {
      res.status(401)
        .json({ message: 'Invalid auth token provided.' })
    })
}

export default verifyJWT_MW
