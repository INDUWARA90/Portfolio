import { useRef, useState } from 'react'
import { uploadToCloudinary } from '../../lib/cloudinary'

function ImageUploader({ folder, imageUrl, label, onUploaded }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  async function uploadFile(file) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.')
      return
    }

    setError('')
    setIsUploading(true)
    setProgress(0)

    try {
      const result = await uploadToCloudinary(file, folder, setProgress)
      onUploaded(result.secure_url)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setIsUploading(false)
    }
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragging(false)
    uploadFile(event.dataTransfer.files[0])
  }

  return (
    <div className="rounded-md border border-white/10 bg-white/[0.03] p-3">
      <div
        className={`grid min-h-36 cursor-pointer place-items-center rounded-md border border-dashed p-4 text-center transition ${
          isDragging ? 'border-cyan-300 bg-cyan-300/10' : 'border-white/15 bg-slate-950/30 hover:border-cyan-300/60'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={label} className="max-h-40 w-full rounded-md object-cover" />
        ) : (
          <div>
            <p className="font-semibold text-white">Drop image here</p>
            <p className="mt-1 text-sm text-slate-400">or click to browse</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => uploadFile(event.target.files[0])}
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={() => inputRef.current?.click()} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/15">
          Upload Image
        </button>
        {isUploading && <span className="text-sm text-cyan-300">{progress}%</span>}
      </div>

      {isUploading && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-cyan-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      <label className="mt-3 block text-sm font-bold text-slate-300 light:text-slate-700">
        Image URL
        <input
          value={imageUrl || ''}
          onChange={(event) => onUploaded(event.target.value)}
          placeholder="https://..."
          className="dashboard-input mt-2"
        />
      </label>

      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  )
}

export default ImageUploader
