

'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiShoppingCart ,HiCurrencyRupee  } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Menu() {
  return (

    <div className='h-full '>
      <Sidebar className=' h-full  ' aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link ><Sidebar.Item icon={HiShoppingCart } as={Link} to="/invoice" className="font-bold"> INVOICE</Sidebar.Item></Link>


            <Sidebar.Collapse icon={HiShoppingBag} label="PRODUCTS " className="font-bold">
              <Link><Sidebar.Item as={Link} to="/addproduct">ADD</Sidebar.Item></Link>


              <Sidebar.Item as={Link} to="/home">AVAILABLE PRODUCTS</Sidebar.Item>

            </Sidebar.Collapse>
            <Sidebar.Collapse icon={HiChartPie} label="REPORTS" className="font-bold">


              <Sidebar.Item as={Link} to="/SW">SALES</Sidebar.Item>
              <Sidebar.Item as={Link} to="/ExW">EXPENSE</Sidebar.Item>
              <Sidebar.Item as={Link} to="/PLD">P & L</Sidebar.Item>
              <Sidebar.Item as={Link} to="/in">Invoice Generated</Sidebar.Item>
            </Sidebar.Collapse>





            <Sidebar.Collapse icon={HiShoppingBag} label="Expenses" className="font-bold">

              <Link><Sidebar.Item as={Link} to="/rawmexpence">ADD  </Sidebar.Item></Link>


            </Sidebar.Collapse>

            <Sidebar.Collapse icon={HiCurrencyRupee} label="Advance Booking" className="font-bold">

              <Link><Sidebar.Item as={Link} to="/advancebook">ADD Booking  </Sidebar.Item></Link>
              <Link><Sidebar.Item as={Link} to="/showbooking">Show Booking  </Sidebar.Item></Link>


            </Sidebar.Collapse>

          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
export default Menu