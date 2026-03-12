import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import NavigationBar from './components/NavigationBar'

export default function RootLayout() {
  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  )
}
