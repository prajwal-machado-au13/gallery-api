import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

const auth = asyncHandler(async (req, res, next) => {
  //   const token = req.headers.authorization.split(' ')[1]
  //   const isCustomAuth = token.length < 500
  //   let decodedData
  //   if (token && isCustomAuth) {
  //     decodedData = jwt.verify(token, 'test')
  //     req.userId = decodedData?.id
  //   } else {
  //     decodedData = jwt.decode(token)
  //     req.userId = decodedData?.sub
  //   }
  //   next()

  // console.log(token)
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }

  const token = req.headers.authorization.split(' ')[1]
  // console.log(token)
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }

  let payload = await jwt.verify(token, 'test')
  // console.log(payload)

  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.imageBy = payload.id
  // console.log(req.imageBy)

  next()
})
export default auth
