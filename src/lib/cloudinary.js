const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export function uploadToCloudinary(file, folder = 'portfolio/projects', onProgress) {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    return Promise.reject(new Error('Missing Cloudinary environment variables'))
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
  formData.append('folder', folder)

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    })

    request.addEventListener('load', () => {
      const response = JSON.parse(request.responseText || '{}')

      if (request.status >= 200 && request.status < 300) {
        resolve(response)
        return
      }

      reject(new Error(response.error?.message || 'Cloudinary upload failed'))
    })

    request.addEventListener('error', () => reject(new Error('Cloudinary upload failed')))
    request.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)
    request.send(formData)
  })
}
