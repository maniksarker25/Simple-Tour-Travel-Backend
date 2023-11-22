import { IReview } from '../interfaces/review.interface'
import Review from '../models/review.model'

const createReview = async (reviewData: IReview): Promise<IReview> => {
  const result = await Review.create(reviewData)

  if (result) {
    Review.calcAverageRatings(result.tour)
  }

  return result
}

const getAllReviews = async (): Promise<IReview[]> => {
  const result = await Review.find().populate({
    path: 'user',
    select: 'name photo',
  })
  return result
}

const getSingleReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findById(id)
  return result
}

const updateReview = async (
  id: string,
  reviewData: IReview,
): Promise<IReview | null> => {
  const result = await Review.findByIdAndUpdate(id, reviewData, {
    new: true,
    runValidators: true,
  })

  if (result) {
    await Review.calcAverageRatings(result.tour)
  }

  return result
}

const deleteReview = async (id: string): Promise<IReview | null> => {
  const result = await Review.findByIdAndDelete(id)

  if (result) {
    await Review.calcAverageRatings(result.tour)
  }

  return result
}

export const reviewServices = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
