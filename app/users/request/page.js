'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from "next/dynamic";
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
  CardMedia,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { TITLE_REQUEST_LIST } from "@/constants";

const LazyMap = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function RequestPage() {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [title, setTitle] = useState('')
  const [imageList, setImageList] = useState([])
  const [location, setLocation] = useState({})
  const [error, setError] = useState(null)

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

    const formData = new FormData()
    formData.append('title', title)
    formData.append('lat', location.lat.toFixed(6))
    formData.append('lng', location.lng.toFixed(6))
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

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'LOCATION') {
          setLocation(data.payload)
          setError(null)
        }

        if (data.type === 'ERROR') {
          setError(data.message)
        }
      } catch (err) {
        console.error('Invalid message:', err)
      }
    }

    window.addEventListener('message', handleMessage)

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: 'REQUEST_LOCATION' })
    )

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <Container maxWidth='sm' sx={{ mt: 3, px: 2, width: '100%', minWidth: 0 }}>
      {location ? (
        <div className='text-lg'>
          <p>Lat: {location.lat?.toFixed(6)}</p>
          <p>Lng: {location.lng?.toFixed(6)}</p>

          <div style={{ height: '360px', width: '100%' }}>
            <LazyMap position={[location.lat?.toFixed(6), location.lng?.toFixed(6)]} />
            {/*<LazyMap position={[7.00836, 100.47668]} />*/}
          </div>
        </div>
      ) : (
        !error && <p>กำลังขอตำแหน่งจากแอป...</p>
      )}

      <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <FormControl required fullWidth >
          <InputLabel id="demo-simple-select-required-label">หัวข้อ</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            label="หัวข้อ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            { TITLE_REQUEST_LIST.map((title, index) => (
              <MenuItem key={`title-${index}`} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
