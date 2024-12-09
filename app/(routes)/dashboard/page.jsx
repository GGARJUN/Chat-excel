"use client";
import React from 'react'
import RightSideDashboard from './_components/page'
import { FileUpload } from '@/components/ui/file-upload';

function Dashboard() {

  return (
    <div className='pt-16 md:pt-4 '>
      <div className='mt-20 flex justify-center'>
        <h1 className='md:text-5xl font-semibold text-3xl'>Chat with any <span className='bg-blue-500 rounded-xl font-bold  text-white p-2'>Excel File</span></h1>

      </div>
      {/* <div className="w-full max-w-4xl md:mx-auto   border border-dashed mt-10  dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
        <FileUpload  />
      </div> */}
      {/* <RightSideDashboard/> */}
    </div>
  )
}

export default Dashboard
