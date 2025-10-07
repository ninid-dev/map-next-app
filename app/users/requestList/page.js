'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Loading from "@/components/Loading";

export default function HelpRequestList() {
  const [requestList, setRequestList] = useState([])
  const [loading, setLoading] = useState(true)
  const [openPreview, setOpenPreview] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    async function fetchRequestList() {
      try {
        const res = await fetch('/api/v1/requests')
        const data = await res.json()

        setRequestList(data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchRequestList()
  }, [])

  const handleOpenPreview = (img) => {
    setPreviewImage(img)
    setOpenPreview(true)
  }

  const handleClosePreview = () => {
    setOpenPreview(false)
    setPreviewImage('')
  }

  return (
    <Container maxWidth='sm' sx={{ mt: 2, px: 1, width: '100%', minWidth: 0 }}>
      {loading ? (
        <Loading />
      ) : requestList.length === 0 ? (
        <Typography sx={{ textAlign: 'center' }}>ยังไม่มีคำขอ</Typography>
      ) : (
        <Grid container spacing={1} direction="row" sx={{
          justifyContent: "center",
          alignItems: "stretch",
        }}>
          {requestList.map((req) => {
            const imageList = req.imgPath ? req.imgPath.split(',') : []

            return (
              <Grid size={6} key={req.id} >
                <Card >
                  {/* รูปหลัก */}
                  {imageList.length > 0 && (
                    <CardMedia
                      component='img'
                      image={imageList[0]}
                      sx={{
                        height: 130,
                        cursor: 'pointer'
                      }}
                      onClick={() => handleOpenPreview(imageList[0])}
                    />
                  )}

                  <CardContent sx={{ p: 1 }}>
                    <Typography variant='subtitle1' sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      {req.title}
                    </Typography>
                    <Typography variant='body2' sx={{ fontSize: '0.85rem', mt: 0.5 }}>
                      {req.detail}
                    </Typography>
                    <Typography variant='caption' sx={{ display: 'block', mt: 0.5 }}>
                      Lat: {req.lat}, Lng: {req.lng}
                    </Typography>
                    <Typography variant='caption' sx={{ display: 'block' }}>
                      วันที่: {new Date(req.createdAt).toLocaleString()}
                    </Typography>

                    {/* Gallery รูปเพิ่มเติม */}
                    {/*{imageList.length > 1 && (*/}
                    {/*  <Box*/}
                    {/*    sx={{*/}
                    {/*      display: 'flex',*/}
                    {/*      overflowX: 'auto',*/}
                    {/*      gap: 0.5,*/}
                    {/*      mt: 1,*/}
                    {/*      pb: 0.5*/}
                    {/*    }}*/}
                    {/*  >*/}
                    {/*    {imageList.slice(1).map((img, idx) => (*/}
                    {/*      <CardMedia*/}
                    {/*        key={idx}*/}
                    {/*        component='img'*/}
                    {/*        image={img}*/}
                    {/*        alt={`additional-${idx}`}*/}
                    {/*        sx={{*/}
                    {/*          height: 60,*/}
                    {/*          width: 60,*/}
                    {/*          flexShrink: 0,*/}
                    {/*          cursor: 'pointer',*/}
                    {/*          borderRadius: 1*/}
                    {/*        }}*/}
                    {/*        onClick={() => handleOpenPreview(img)}*/}
                    {/*      />*/}
                    {/*    ))}*/}
                    {/*  </Box>*/}
                    {/*)}*/}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        {/*</Box>*/}
        </Grid>
      )}

      {/* Dialog สำหรับ preview รูปใหญ่ */}
      {
        previewImage && (
          <Dialog open={openPreview} onClose={handleClosePreview} maxWidth='xs' fullWidth>
            <DialogContent sx={{ p: 0, position: 'relative', bgcolor: 'black' }}>
              <IconButton
                onClick={handleClosePreview}
                sx={{ position: 'absolute', top: 8, right: 8, color: 'white', zIndex: 1 }}
              >
                <CloseIcon />
              </IconButton>
              <img
                src={previewImage}
                alt='preview'
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </DialogContent>
          </Dialog>
        )
      }
    </Container>
  )
}
