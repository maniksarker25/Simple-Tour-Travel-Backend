import express from 'express'
import { reviewController } from '../controllers/review.controller'

const router = express.Router()

router.post('/create-review', reviewController.createReview)
router.get('/', reviewController.getAllReviews)
router.get('/:id', reviewController.getSingleReview)
router.patch('/:id', reviewController.updateReview)
router.delete('/:id', reviewController.deleteReview)

export const reviewRoutes = router
