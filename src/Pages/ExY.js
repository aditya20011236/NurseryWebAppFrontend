import React from 'react'
import Ex_Nav from '../Expance/Expense_Nav'
import Menu from '../Sidebar'
import Ex_Yearly from '../Expance/Expense_Yearly'
export default function ExY() {
  return (
    <>
    <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Ex_Nav/>
    <Ex_Yearly/>
    </div>
    </div>
    </>
  )
}
