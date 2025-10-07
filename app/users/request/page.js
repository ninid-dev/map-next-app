'use client'

import { useState, useEffect } from 'react'
import { resizeImage } from '@/utils/image.util'
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardMedia
} from '@mui/material'

export default function RequestPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [imageList, setImageList] = useState([]) // เก็บไฟล์และ preview URL

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)

    const resizedFiles = await Promise.all(
      files.map(async (file) => {
        const resized = await resizeImage(file)

        return {
          file: resized,
          url: URL.createObjectURL(resized)
        }
      })
    )

    setImageList((prev) => [...prev, ...resizedFiles])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // const lat = parseFloat(e.target.lat.value)
    // const lng = parseFloat(e.target.lng.value)

    const formData = new FormData()
    formData.append('title', e.target.title.value)
    // formData.append('lat', lat)
    formData.append('lat', '7.00836')
    // formData.append('lng', lng)
    formData.append('lng', '100.47668')
    formData.append('detail', e.target.detail.value)
    imageList.forEach((img) => formData.append('imgList', img.file)) // append หลายไฟล์

    const res = await fetch('/api/v1/requests', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    setResponse(data)
    setLoading(false)
  }

  const onClearButtonClick = () => {
    setImageList([])
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 3, px: 2, width: '100%', minWidth: 0 }}>
      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <TextField
          label='Title'
          name='title'
          required
          fullWidth
          size='small'
        />
        {/*TODO: get ตำแหน่ง */}
        <TextField
          label='รายละเอียด'
          name='detail'
          required
          fullWidth
          multiline
          rows={3}
          size='small'
        />

        <Button variant='contained' component='label' sx={{ py: 1 }}>
          อัพโหลดรูปภาพ
          <input
            type='file'
            name='img'
            accept='image/*'
            multiple
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {/* Preview รูป */}
        {imageList.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              overflowX: 'auto',
              pb: 1,
              border: '1px solid gray',
              borderRadius: 2,
              padding: 1
            }}
          >
            {imageList.map((img, idx) => (
              <Card key={idx} sx={{ flex: '0 0 auto', width: 120, height: 120 }}>
                <CardMedia
                  component='img'
                  image={img.url}
                  alt={`preview-${idx}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 1 }}
                />
              </Card>
            ))}
          </Box>
        )}

        <Button type='submit' variant='contained' color='primary' disabled={loading} sx={{ py: 1 }}>
          {loading ? <CircularProgress size={24} /> : 'ส่งคำขอ'}
        </Button>
        <Button variant="outlined" onClick={onClearButtonClick}>
          Clear
        </Button>
      </Box>

      {response && (
        <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
          <Typography variant='subtitle2' gutterBottom>
            Response:
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </Box>
      )}
    </Container>
  )
}
