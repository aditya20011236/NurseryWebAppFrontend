import React from 'react';

function PL_Nav() {
  return (
    <nav className="bg-green-500 bg-opacity-70 backdrop-blur-lg py-2">
       <div>
       <h2 class="text-3xl font-bold text-black-700 mb-4">P&L Report</h2>
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
          <NavLink href="/PLD">Daily</NavLink>
          <NavLink href="/PLW">Weekly</NavLink>
          <NavLink href="/PLM">Monthly</NavLink>
          <NavLink href="/PLQ">Quarterly</NavLink>
          <NavLink href="/PLY">Yearly</NavLink>
          
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <div className="w-1/2 md:w-auto mb-2 md:mb-0">
      <a href={href} className="block text-white hover:text-gray-300 text-center md:text-left">{children}</a>
    </div>
  );
}

export default PL_Nav;