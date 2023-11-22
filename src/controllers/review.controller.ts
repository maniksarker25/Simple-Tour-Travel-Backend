/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { reviewServices } from '../services/review.service'

const createReview = async (req: Request, res: Response) => {
  try {
    const reviewData = req.body
    const result = await reviewServices.createReview(reviewData)
    res.status(201).json({
      status: 'success',
      message: 'Review created successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await reviewServices.getAllReviews()
    res.status(200).json({
      status: 'success',
      message: 'Review fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const getSingleReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await reviewServices.getSingleReview(id)
    res.status(200).json({
      status: 'success',
      message: 'Single Review fetched successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewData = req.body
    const id = req.params.id
    const result = await reviewServices.updateReview(id, reviewData)
    res.status(200).json({
      status: 'success',
      message: 'Review updated successfully',
      data: result,
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}
const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await reviewServices.deleteReview(id)
    res.status(200).json({
      status: 'success',
      message: 'Review deleted successfully',
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const reviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
