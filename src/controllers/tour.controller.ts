/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { tourServices } from '../services/tour.service'

const createTour = async (req: Request, res: Response) => {
  try {
    const tourData = req.body
    const result = await tourServices.createTour(tourData)
    res.status(201).json({
      status: 'success',
      message: 'Tour created successfully',
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

const getAllTours = async (req: Request, res: Response) => {
  try {
    const result = await tourServices.getAllTours()
    res.status(200).json({
      status: 'success',
      message: 'Tour fetched successfully',
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
const getSingleTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getSingleTour(id)
    res.status(200).json({
      status: 'success',
      message: 'Single Tour fetched successfully',
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
const updateTour = async (req: Request, res: Response) => {
  try {
    const tourData = req.body
    const id = req.params.id
    const result = await tourServices.updateTour(id, tourData)
    res.status(200).json({
      status: 'success',
      message: 'Tour updated successfully',
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
const getNextSchedule = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await tourServices.getNextSchedule(id)
    res.status(200).json({
      status: 'success',
      message: 'Next Schedule fetched successfully',
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
const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await tourServices.deleteTour(id)
    res.status(200).json({
      status: 'success',
      message: 'Tour deleted successfully',
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    })
  }
}

export const tourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
