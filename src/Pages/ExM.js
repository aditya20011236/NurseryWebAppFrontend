import React from 'react'
import Ex_Month from '../Expance/Expense_Month'
import Ex_Nav from '../Expance/Expense_Nav'
import Menu from '../Sidebar'
export default function ExM() {
  return (
    <>
    <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Ex_Nav/>
    <Ex_Month/>
    </div>
    </div>
    </>
  )
}
