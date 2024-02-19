import React from 'react';
import { Link } from 'react-router-dom';
import profileImage from "./assets/food.png";

function Nav() {
  return (
    <nav className="bg-indigo-700 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={profileImage}
            alt="Logo"
            className="h-10 w-10"
          />
          {/* <h2 className="text-white text-lg font-bold">สถานที่ท่องเที่ยว</h2> */}
          <h2 className="text-white text-lg font-bold"><Link to="/">รายการอาหาร</Link></h2>
        </div>
        <ul className="flex space-x-4 text-white">
          <li><Link to="/AboutMe">About Me</Link></li>
          <li><Link to="/CRUD">จัดรายการอาหาร</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
