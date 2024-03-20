import React from 'react'
import Ex_Q from '../Expance/Expense_Q'
import Ex_Nav from '../Expance/Expense_Nav'
import Menu from '../Sidebar'
export default function ExQ() {
  return (
    <>
    <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Ex_Nav/>
    <Ex_Q/>
    </div>
    </div>
    </>
  )
}
