import apiCaller from '../helpers/apiCaller'

const upload = async (images) => {
  // console.log('images', images)
  const formData = new FormData()

  images.forEach((item) => formData.append('images', item))

  return await apiCaller(`/api/upload`, 'POST', formData)
}

const uploadImageWithProductId = async (images) => {
  const formData = new FormData()

  images.forEach((item) => formData.append('images', item))

  return await apiCaller(`/api/uploadWithProductId`, 'POST', formData)
}

const UploadApi = { upload, uploadImageWithProductId }

export default UploadApi
