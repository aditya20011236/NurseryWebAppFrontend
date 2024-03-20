import React from 'react'
import Menu from '../Sidebar'

import PL_Yearly from '../ProfitLoss/ProfitY'
import PL_Nav from '../ProfitLoss/Profit_Nav'

export default function PLY() {
  return (
    <div>
    <div className='flex'>
  <div>
      <Menu/>
  </div>
  <div className='w-full'>
<PL_Nav/>
<PL_Yearly/>
  </div>
  </div>
  </div>
  )
}
