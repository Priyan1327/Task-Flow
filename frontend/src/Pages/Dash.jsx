import { FaPlus } from "react-icons/fa";

import NewTask from '../Reusecomp/NewTask.jsx'
import Navbar from './Navbar'
import TaskCard from "../Reusecomp/TaskCard";

import axios from "axios"

import React, { useState , useEffect } from "react";
import { setTasks } from "../Slices/SliceTask";
import { useSelector, useDispatch } from "react-redux";

import dashimage from '../assets/dashwallpaper.jpeg';




axios.defaults.withCredentials = true;


function Dashboard() {

  const [ show ,setShow] = useState(false);

  const taask = () => {

    setShow(true)

  };


  
const tasks = useSelector((state) => state.task.tasks);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks");
        dispatch(setTasks(res.data));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [dispatch]);


  return (
   <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-800 p-5 bg-cover bg-no-repeat bg-center"  style={{backgroundImage: `url(${dashimage})`}}>
      
      {/*Button to Add */}
      <div className='flex absolute ml-[90%] mt-[35%] rounded-2xl'>
          <button onClick={taask} className= ' fixed text-black p-4 text-2xl rounded-4xl bg-emerald-400 hover:bg-emerald-300 '><FaPlus /></button>
      </div>
      

        < div >{show && <NewTask onClose={() => setShow(false)} />}</div>


      {/* Card Component : TaskCard */}
      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
     </div>

    </div> 
 </div>
  );
}

export default Dashboard;
