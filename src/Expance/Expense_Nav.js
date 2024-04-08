import React from 'react';

function Ex_Nav() {
  return (
    <nav className="bg-green-500 bg-opacity-70 backdrop-blur-lg py-2">
       <div>
       <h2 class="text-3xl font-bold text-white-700 mb-4">Expense Report</h2>
      </div>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
          <NavLink href="/ExD">Daily</NavLink>
          <NavLink href="/ExW">Weekly</NavLink>
          <NavLink href="/ExM">Monthly</NavLink>
          <NavLink href="/ExQ">Quarterly</NavLink>
          <NavLink href="/ExY">Yearly</NavLink>
          
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

export default Ex_Nav;