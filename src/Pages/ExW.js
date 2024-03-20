import React from 'react'
import Ex_Nav from '../Expance/Expense_Nav'
import Menu from '../Sidebar'
import Ex_week from '../Expance/Expense_Week'

export default function ExW() {
  return (
    <>
    <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <Ex_Nav/>
    <Ex_week/>
    </div>
    </div>
    </>
  )
}
