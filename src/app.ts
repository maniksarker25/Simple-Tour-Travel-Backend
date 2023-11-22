import express, { Application, Request, Response } from 'express'
import { userRoutes } from './routes/user.route'
import cors from 'cors'
import { tourRoutes } from './routes/tour.route'
import { reviewRoutes } from './routes/review.route'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/tours', tourRoutes)
app.use('/api/v1/reviews', reviewRoutes)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to  Murir Tin Tours & Travels',
  })
})

export default app
