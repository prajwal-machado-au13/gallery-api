import express from 'express'
import cloudinary from 'cloudinary'
const router = express.Router()
import {
  createPhoto,
  getSpecificPhotos,
  getPhotos,
  updatePhoto,
  deletePhoto,
} from '../controllers/photoController.js'
import auth from '../middleware/auth.js'

var cloud = cloudinary.v2
cloud.config({
  cloud_name: 'prajmach',
  api_key: '196264344361614',
  api_secret: 'YPxiNuxVoTczOGR3or9-lbGPlXc',
})

const upload = async (req, res, next) => {
  if (req.files) {
    // console.log(req.files)
    if (req.files.photo.mimetype === 'image/jpeg') {
      const file = req.files.photo
      let result = await cloud.uploader.upload(file.tempFilePath)
      req.result = result.url
      return next()
    } else {
      let err = new Error('please upload the single image file in jpg format ')
      return next(err)
    }
  } else {
    return next()
  }
}

/* @desc Post a photo
@route POST /api/photos */

router.post('/', upload, auth, createPhoto)
/*
@desc    Fetch all photos
@route   GET /api/photos
*/

router.get('/', getPhotos)

// @desc    Fetch all photos of specific user
// @route   GET /api/photos/all

router.get('/all', auth, getSpecificPhotos)

router.patch('/:id', upload, auth, updatePhoto)

router.delete('/:id', auth, deletePhoto)

export default router
