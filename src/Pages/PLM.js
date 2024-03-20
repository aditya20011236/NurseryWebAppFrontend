import React from 'react'
import Menu from '../Sidebar'
import PL_Nav from '../ProfitLoss/Profit_Nav'
import PL_Daily from '../ProfitLoss/ProfitD'
import PL_month from '../ProfitLoss/ProfitM'

export default function PLM() {
  return (
    <div>
      <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <PL_Nav/>
    <PL_month/>
    </div>
    </div>
    </div>
  )
}
