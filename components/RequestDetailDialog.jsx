'use client'

import {Box, Card, CardContent, CardMedia, Chip, Dialog, DialogContent, IconButton, Typography} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { getRequestLabel } from '@/utils/titleRequest.util'
import {REQUEST_STATUS} from "@/constants";

export default function RequestDetailDialog ({
  open,
  data,
  onClose,
  onNext,
  onPrev,
  isFirst,
  isLast
}) {
  if (!data) return null

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card sx={{ maxHeight: '80vh' }}>
        <Box sx={{ position: 'relative' }}>
          <Chip
            size="small"
            label={REQUEST_STATUS[data.status].label}
            sx={{
              backgroundColor: REQUEST_STATUS[data.status].color,
              color: REQUEST_STATUS[data.status].textColor,
              fontWeight: 'bold',
              position: 'absolute',
              top: 10,
              left: 8,
              zIndex: 2
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 1,
              right: 2,
              color: 'white',
              zIndex: 2
            }}
          >
            <CloseIcon />
          </IconButton>
          {!isFirst && (
            <IconButton
              onClick={onPrev}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                color: 'white',
                zIndex: 2
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          )}
          {!isLast && (
            <IconButton
              onClick={onNext}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                color: 'white',
                zIndex: 2
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}
          <CardMedia
            component='img'
            image={`/app${data.imgPath}`}
            sx={{
              width: '100%',
              maxHeight: '55vh',
              objectFit: 'cover'
            }}
          />
        </Box>
        <CardContent>
          <Typography variant='subtitle1' sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
            { getRequestLabel(data.title) }
          </Typography>
          <Typography variant='body2' sx={{ fontSize: '0.85rem', mt: 0.5 }}>
            {data.detail}
          </Typography>
          <Typography variant='caption' sx={{ display: 'block', mt: 0.5 }}>
            Lat: {data.lat}, Lng: {data.lng}
          </Typography>
          <Typography variant='caption' sx={{ display: 'block' }}>
            วันที่: {new Date(data.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
}

