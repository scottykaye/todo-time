import React, { Suspense } from 'react'
import StandardPage from './standard/page'


const delay = delay => {
  return new Promise(resolve => setTimeout(resolve, delay))
}

async function Delay({ children }) {
  await delay(1000)

  return children
}


export default function RootPage({ children }: { children: React.ReactNode }) {
  return (<Suspense fallback={'Loading...'}>
    <Delay>
      {children}
      <StandardPage />
    </Delay>
  </Suspense>)
}
