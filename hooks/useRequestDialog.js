'use client'

import { useState } from 'react'

export function useRequestDialog () {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)

  const openPreview = (list, startIndex = 0) => {
    setItems(list)
    setIndex(startIndex)
    setOpen(true)
  }

  const closePreview = () => {
    setOpen(false)
    setItems([])
    setIndex(0)
  }

  const next = () => {
    if (index < items.length - 1) setIndex(i => i + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(i => i - 1)
  }

  return {
    open,
    items,
    index,
    current: items[index] || null,
    isFirst: index === 0,
    isLast: index === items.length - 1,
    openPreview,
    closePreview,
    next,
    prev
  }
}

