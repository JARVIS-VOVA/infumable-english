import jwt from 'jsonwebtoken'

// TODO: Change secretKey

const verifyJWT = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secretKey', (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err)
      }

      resolve(decodedToken)
    })
  })
}

export default verifyJWT
