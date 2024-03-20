import React from 'react'
import Ex_Daily from '../Expance/Expense_Daily'
import Ex_Nav from '../Expance/Expense_Nav'
import Menu from '../Sidebar'
export default function ExD() {
  return (
   <>
   <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Ex_Nav/>
    <Ex_Daily/>
    </div>
    </div>
   </>
  )
}
