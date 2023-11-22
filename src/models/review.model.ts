import { Schema, model } from 'mongoose'
import { IReview, IReviewModel } from '../interfaces/review.interface'
import Tour from './tour.model'

const reviewSchema = new Schema<IReview, IReviewModel>(
  {
    review: {
      type: String,
      required: [true, 'Please tell us your review'],
    },
    rating: {
      type: Number,
      required: [true, 'Please tell us your rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Please tell us your tour'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please tell us your user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

reviewSchema.index({ tour: 1, user: 1 }, { unique: true })

reviewSchema.statics.calcAverageRatings = async function (
  tourId: Schema.Types.ObjectId,
) {
  //tourId newObjectId("2vj3ffvgcd")
  //this refers the Review  Model
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        numberOfRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ])

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: stats[0].numberOfRatings,
      ratingQuantity: stats[0].avgRating,
    })
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingAverage: 0,
      ratingQuantity: 0,
    })
  }
}

const Review = model<IReview, IReviewModel>('Review', reviewSchema)

export default Review
