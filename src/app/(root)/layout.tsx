import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import Container from '@/components/shared/container'

function Layout({ children, modal } : {children: React.ReactNode, modal: React.ReactNode}) {
  return (
    <div>
        {/* <SessionProvider> */}
          <ThemeProvider attribute={'class'} defaultTheme="light" disableTransitionOnChange>
            <Container>
              {modal}
              {children}
              {/* <Toaster richColors /> */}
            </Container>
          </ThemeProvider>
        {/* </SessionProvider> */}
    </div>
  )
}

export default Layout