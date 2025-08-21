import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import Container from '@/components/shared/container'

function Layout({ children } : {children: React.ReactNode}) {
  return (
    <div>
        {/* <SessionProvider> */}
          <ThemeProvider attribute={'class'} defaultTheme="light" disableTransitionOnChange>
            <Container>
              {children}
              {/* <Toaster richColors /> */}
            </Container>
          </ThemeProvider>
        {/* </SessionProvider> */}
    </div>
  )
}

export default Layout