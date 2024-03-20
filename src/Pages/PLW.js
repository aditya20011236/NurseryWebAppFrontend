import React from 'react'
import Menu from '../Sidebar'
import PL_week from '../ProfitLoss/ProfitW'
import PL_Nav from '../ProfitLoss/Profit_Nav'

export default function PLW() {
  return (
    <div>
    <div className='flex'>
  <div>
      <Menu/>
  </div>
  <div className='w-full'>
  <PL_Nav/>
  <PL_week/>
  </div>
  </div>
  </div>
  )
}
