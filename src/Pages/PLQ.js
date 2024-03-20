import React from 'react'
import Menu from '../Sidebar'
import Ex_Nav from '../Expance/Expense_Nav'
import PL_Q from '../ProfitLoss/ProfitDQ'

export default function PLQ() {
  return (
    <div>
      <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
<Ex_Nav/>  
 <PL_Q/>
    </div>
    </div>
    </div>
  )
}
