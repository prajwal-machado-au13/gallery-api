import asyncHandler from 'express-async-handler'
import Photo from '../models/photoModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

export const getPhotos = asyncHandler(async (req, res) => {
  const photos = await Photo.find({ isPrivate: false })
  // console.log(photos)
  res.json(photos)
})

export const createPhoto = asyncHandler(async (req, res) => {
  req.imageBy = mongoose.Types.ObjectId(req.imageBy)
  const post = req.body

  const newPhoto = new Photo({
    ...post,
    imageBy: req.imageBy,
    photo: req.result,
    createdAt: new Date().toISOString(),
  })

  await newPhoto.save()

  res.status(201).json(newPhoto)
})

export const getSpecificPhotos = asyncHandler(async (req, res) => {
  let imageBy = mongoose.Types.ObjectId(req.imageBy)
  // .aggregate([
  //   {   $match: {_id: imageBy,},},
  //   { $lookup: {from: 'photos',localField: '_id',foreignField: 'imageBy',as: 'userphotos',}},
  // ])
  let UserImages = await Photo.find({ imageBy })
  return res.status(200).json({
    UserImages,
  })
})

export const updatePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { title, description, imageBy, isPrivate, photo } = req.body

  let user = await User.findOne({ _id: req.imageBy })
  let image = user.photo

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  const updatedPost = {
    imageBy,
    title,
    description,
    isPrivate,
    _id: id,
    photo: req.result ? req.result : image,
  }

  await Photo.findByIdAndUpdate(id, updatedPost, { new: true })

  res.json(updatedPost)
})

export const deletePhoto = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`)

  await Photo.findByIdAndRemove(id)

  res.json({ message: 'Post deleted successfully.' })
})
