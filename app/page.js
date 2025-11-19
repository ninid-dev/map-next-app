'use client'

import {Container} from "@mui/material";

export default function RootPage() {
  return (
    <Container sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: '100vh'
    }}>
      <h1>
        Hello world
      </h1>
    </Container>
  )
}
