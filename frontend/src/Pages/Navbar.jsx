import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';



function Navbar() { 


 const log_exit = () => {}

  
  return (

      <div className='flex justify-between p-6  font-sans font-medium shadow-xl bg-black text-emerald-400 '>

          <h2 className='text-3xl tracking-tighter font-bold '>Task Manager</h2>

          <button  className="bg-emerald-500 hover:bg-emerald-300 text-black font-bold px-4 py-2 rounded-lg shadow-md transition">
            Log Out
          </button>

        
      </div>


  )
};

export default Navbar;


