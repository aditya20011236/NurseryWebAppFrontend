import React from 'react'
import Menu from '../Sidebar'

import PL_Q from '../ProfitLoss/ProfitDQ'
import PL_Nav from '../ProfitLoss/Profit_Nav'

export default function PLQ() {
  return (
    <div>
      <div className='flex'>
        <div>
          <Menu />
        </div>
        <div className='w-full'>
          <PL_Nav />
          <PL_Q />
        </div>
      </div>
    </div>
  )
}
