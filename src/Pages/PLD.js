import React from 'react'
import Menu from '../Sidebar'
import PL_Nav from '../ProfitLoss/Profit_Nav'
import PL_Daily from '../ProfitLoss/ProfitD'

export default function PLD() {
  return (
    <div>
      <div className='flex'>
    <div>
        <Menu/>
    </div>
    <div className='w-full'>
    <PL_Nav/>
    <PL_Daily/>
    </div>
    </div>
    </div>
  )
}
