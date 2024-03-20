import React from 'react'
import Sl_Nav from '../Sales/Sales_Nav'
import Menu from '../Sidebar'
import SL_Yearly from '../Sales/Sales_Yearly'

export default function SY() {
  return (
    <>
    <div className='flex'>
     <div>
         <Menu/>
     </div>
     <div className='w-full'>
     <Sl_Nav/>
     <SL_Yearly/>
     </div>
     </div>
    </>
  )
}
