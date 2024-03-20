import React from 'react';

function Sl_Nav() {
  return (
    <nav className="bg-gray-800 bg-opacity-70 backdrop-blur-lg py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-wrap justify-center md:justify-start space-x-2 md:space-x-4">
          <NavLink href="/SD">Daily</NavLink>
          <NavLink href="/SW">Weekly</NavLink>
          <NavLink href="/SM">Monthly</NavLink>
          <NavLink href="/SQ">Quarterly</NavLink>
          <NavLink href="/SY">Yearly</NavLink>
          
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

export default Sl_Nav;