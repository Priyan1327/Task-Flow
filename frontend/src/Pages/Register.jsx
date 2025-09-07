import axios from 'axios';
import React, { useState } from 'react'
import { toast, Toaster } from "react-hot-toast";

import imgage from '../assets/images.jpg'



function Register() {

     const [username , setUsername] = useState("");
 
     const [password , setPassword] = useState("");

     const [email , setEmail] = useState("");

     const [role ,setRole] =useState("")

     const [loading, setLoading] = useState(false);

     const registerfunction = async (e) => {
    e.preventDefault();

    if (!username || !password || !email || !role) {
      return toast.error("👉 Provide All Fields 👈");
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
              username,
              email,
              password,
              role
      });

      toast.success("Registration is Successful ✅");
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("")

      console.log(response.data);
    } catch (error) {
      // Show backend error if available
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration Failed ❌");
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


return (

<>

<div className='flex  items-center  justify-center min-h-screen bg-cover bg-no-repeat bg-center' style={{backgroundImage : `url(${imgage})`}}>
    <div className=' flex bg-transparent/10 backdrop-blur-lg   items-center justify-center min-h-screen'>

     {/*Register Form */}

     <div className=' backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md border-2 backdrop-blur-4xl'>
 
         <h1 className='heading text-4xl font-bold text-center text-white mb-6'>Register</h1>

          <form onSubmit={registerfunction}>

               <div>
                    <label htmlFor="username" className='text-white  '>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)}
                           value={username} 
                           type="text" 
                           placeholder='Username'
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer m-1" />
               </div>

                <div>
                    <label htmlFor="email" className='text-white '>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           type="email" 
                           placeholder='email'
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer m-1" />
               </div>

               <div>
                    <label htmlFor="password" className='text-white'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)}
                           value={password} 
                           type="password" 
                           placeholder='Password'
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer m-1" />
               </div>

               <div>
                    <label htmlFor="role" className='text-white'>Role</label>
                    <input onChange={(e) => setRole(e.target.value)}
                           value={role} 
                           type="text" 
                           placeholder='TL / Member'
                           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer m-1" />
               </div>

                <div>
                    <button className='w-full py-3 bg-blue-500 mt-5 text-center rounded-lg p-2 
                            font-semibold text-white cursor- pointer hover:bg-blue-800 transition duration-300' 
                            type='submit' 
                             >Register</button>
               </div>

          </form>

     </div>

  </div>

   <div>
      <Toaster position="top-center" />
      {/* form code here */}
    </div>


</div>
  
</>
  )
}

export default Register;

