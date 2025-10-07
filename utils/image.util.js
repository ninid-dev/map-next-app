export const resizeImage = (file, maxWidth = 400, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const scaleSize = maxWidth / img.width
      canvas.width = maxWidth
      canvas.height = img.height * scaleSize
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type })
          resolve(resizedFile)
        },
        file.type,
        quality
      )
    }

    img.src = URL.createObjectURL(file)
  })
}

