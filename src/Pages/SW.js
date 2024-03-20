import React from 'react'
import Sl_week from '../Sales/Sales_Week'
import Sl_Nav from '../Sales/Sales_Nav'
import Menu from '../Sidebar'
export default function SW() {
  return (
    <>
   <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Sl_Nav/>
    <Sl_week/>
    </div>
    </div>
   </>
  )
}
