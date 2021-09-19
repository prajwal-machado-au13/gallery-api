import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import colors from 'colors'
import fileUpload from 'express-fileupload'
import photoRoutes from './routes/photoRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()
app.use(express.json({ limit: '512kb', type: 'application/json' })) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// upload file at temp location
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

connectDB()

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/photos', photoRoutes)
app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
