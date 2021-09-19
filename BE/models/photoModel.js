/* i. title (title for the image)
ii. description (about image)
iii. image_by (author of the image)
iv. is_private (identifier to know if image is public or private)
 */
import mongoose from 'mongoose'

const photosSchema = mongoose.Schema(
  {
    photo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Photo = mongoose.model('Photo', photosSchema)

export default Photo
