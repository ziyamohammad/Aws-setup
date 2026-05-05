import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

const uploadcloudinary = async (file) => {
  try {
   if (!file) return null

  const ext = file.split(".").pop().toLowerCase()
  const isImage = ["jpg", "jpeg", "png", "webp"].includes(ext)

  const response = await cloudinary.uploader.upload(file, {
    resource_type: isImage ? "image" : "raw",
    use_filename: true,
    unique_filename: true
  })

  return response.secure_url
  } catch (error) {
    if (fs.existsSync(file)) fs.unlinkSync(file)
    throw error
  }
}


export {uploadcloudinary}