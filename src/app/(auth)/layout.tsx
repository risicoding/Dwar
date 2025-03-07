import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
  <div className='min-h-[calc(100vh-100px)] flex items-center justify-center'>{children}</div>
  )
}

export default Layout
