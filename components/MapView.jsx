"use client";

import "leaflet/dist/leaflet.css";

import { icon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {useEffect, useMemo, useRef, useState} from "react";
import {isEmpty} from "lodash";

function DraggableMarker(props) {
  const { center, onSendData } = props;
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)

  const ICON = icon({
    iconUrl: "/assets/marker.png",
    iconSize: [32, 32],
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const cord = marker.getLatLng()
          setPosition([cord.lat.toFixed(6), cord.lng.toFixed(6)])
        }
      },
    }),
    [],
  )

  const getAddress = async () => {
    try {
      const lat = position[0]
      const lng = position[1]
      // TODO: เอาขึ้น prd ไม่ได้ ติด policy ตอนนี้แค่ทดลอง
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=th`

      const res = await fetch(url)
      const data = await res.json()

      const address = data.display_name || 'ไม่พบข้อมูล'

      onSendData({
        address,
        position: {
          lat,
          lng
        }
      })
    } catch (error) {
      console.error('error get address', error)
    }
  }

  useEffect(() => {
    getAddress()
    console.log('position', position)
  }, [position])

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={ICON}
    />
  )
}

export default function Map(props) {
  const { position = [], zoom = 16, onSendData } = props

  return (
    <MapContainer
      preferCanvas={true}
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { !isEmpty(position) && <DraggableMarker center={position} onSendData={onSendData} />}
    </MapContainer>
  );
}
