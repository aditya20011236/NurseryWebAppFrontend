import React from 'react';
import Logo from './Logo.png';

export default function Header() {
  return (
    <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full sticky top-0">
      <div className="mb-2 sm:mb-0 flex flex-row">
        <div className="h-16 w-24 self-center mr-2">
          <img className="h-full w-full self-center" src={Logo} alt="Logo" />
        </div>
        <div>
          <a href="/home" className="text-4xl no-underline text-gray-800 hover:text-blue-dark font-sans font-bold ">
            <span className="text-teal-500 transform rotate-3">Shree</span> 
            <span className="text-teal-600 transform rotate-6"> Samarth</span> 
            <span className="text-teal-700 transform rotate-9"> Nursery</span>
          </a>
          <br />
        </div>
      </div>
      <div className="sm:mb-0 self-center">
        {/* <div className="h-10">
          <a href="/two" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 uppercase">Log Out</a>
        </div> */}
      </div>
    </nav>
  );
}
