import React from 'react'
import Header from './Componets/Header/Header'

export default function App() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <main className='flex flex-col items-center px-4 md:px-8 lg:px-16'>
        
        <Header />


      </main>

    </>
  )
}

