import React from 'react'
import Sl_Nav from '../Sales/Sales_Nav'
import Menu from '../Sidebar'
import Sl_Daily from '../Sales/Sales_Daily'

export default function SD() {
  return (
    <>
   <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Sl_Nav/>
    <Sl_Daily/>
    </div>
    </div>
   </>
  )
}
