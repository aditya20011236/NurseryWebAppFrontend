import React from 'react'
import Sl_Q from '../Sales/Sales_Q'
import Sl_Nav from '../Sales/Sales_Nav'
import Menu from '../Sidebar'
export default function SQ() {
  return (
    <>
    <div className='flex'>
     <div>
         <Menu/>
     </div>
     <div className='w-full'>
     <Sl_Nav/>
     <Sl_Q/>
     
     </div>
     </div>
    </>
  )
}
