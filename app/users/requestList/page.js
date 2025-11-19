'use client'

import {useState, useEffect, Suspense, useCallback} from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent, Chip, Box,
} from '@mui/material'
import Loading from "@/components/Loading";
import { useSearchParams } from 'next/navigation'
import {useRequestDialog} from "@/hooks/useRequestDialog";
import RequestDetailDialog from "@/components/RequestDetailDialog";
import {getRequestLabel} from "@/utils/titleRequest.util";
import {REQUEST_STATUS} from "@/constants";

function HelpRequestListContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [requestList, setRequestList] = useState([])
  const [loading, setLoading] = useState(true)

  const {
    open,
    current,
    openPreview,
    closePreview,
    next,
    prev,
    isFirst,
    isLast
  } = useRequestDialog()

  const splitImagePath = useCallback((item) => {
    return item?.imgPath
      ? item.imgPath.split(',').map(x => x.trim())
      : []
  }, [])

  const handleOpen = (item) => {
    const previewList = splitImagePath(item).map(img => ({
      ...item,
      imgPath: img
    }))

    openPreview(previewList, 0)
  }

  useEffect(() => {
    window.console.log = (...args) => {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'log', data: args }))
    }

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        if (data.type === 'REFRESH') {
          window.location.reload()
        }
      } catch (err) {
        console.error('Invalid message:', err)
      }
    }

    document.addEventListener('message', handleMessage)
    window.addEventListener('message', handleMessage)

    async function fetchRequestList() {
      try {
        const url = `/app/api/v1/requests`
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const data = await res.json()

        setRequestList(data.data)
      } catch (err) {
        console.error('error', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRequestList()

    return () => {
      document.removeEventListener('message', handleMessage)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return (
    <Container maxWidth='sm' sx={{ mt: 2, px: 1, width: '100%', minWidth: 0 }}>
      {loading ? (
        <Loading />
      ) : requestList.length === 0 ? (
        <Typography sx={{ textAlign: 'center' }}>ยังไม่มีคำขอ</Typography>
      ) : (
        <Grid container spacing={1} direction="row" sx={{
          justifyContent: "start",
          alignItems: "stretch",
        }}>
          {requestList.map((req) => {
            return (
              <Grid size={6} key={req.id} >
                <Card onClick={() => handleOpen(req)} >
                  {splitImagePath(req).length > 0 && (
                    <Box sx={{ position: 'relative' }}>
                      <Chip
                        size="small"
                        label={REQUEST_STATUS[req.status].label}
                        sx={{
                          backgroundColor: REQUEST_STATUS[req.status].color,
                          color: REQUEST_STATUS[req.status].textColor,
                          fontWeight: 'bold',
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          zIndex: 2
                        }}
                      />

                      <CardMedia
                        component='img'
                        image={`/app/${splitImagePath(req)[0]}`}
                        sx={{
                          height: 130,
                          cursor: 'pointer',
                          borderRadius: '4px'
                        }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ p: 1 }}>
                    <Typography variant='subtitle1' sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      { getRequestLabel(req.title) }
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
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      )}
      <RequestDetailDialog
        open={open}
        data={current}
        onClose={closePreview}
        onNext={next}
        onPrev={prev}
        isFirst={isFirst}
        isLast={isLast}
      />
    </Container>
  )
}

export default function HelpRequestList() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HelpRequestListContent />
    </Suspense>
  )
}
