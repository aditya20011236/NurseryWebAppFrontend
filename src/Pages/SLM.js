import React from 'react'
import Sl_Month from '../Sales/Sales_Month'
import Sl_Nav from '../Sales/Sales_Nav'
import Menu from '../Sidebar'
export default function SM() {
  return (
    <>
    <div className='flex'>
     <div>
         <Menu/>
     </div>
     <div className='w-full'>
     <Sl_Nav/>
     <Sl_Month/>
     </div>
     </div>
    </>
  )
}
