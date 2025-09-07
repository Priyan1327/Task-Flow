import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import axios from "axios";
import { deleteTask } from "../Slices/SliceTask";
import toast from "react-hot-toast";

function TaskCard({ task }) {


  const dispatch = useDispatch();
  
  const formattedDate = new Date(task.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",

  });


  const remove = async () => {
      try{
      const res = await axios.delete(`http://localhost:5000/api/delete/${task._id}`,{
        withCredentials : true
                               });
                               
      dispatch(deleteTask(task._id))
      toast.success("Task is Deleted")
    }catch(error){
      toast.error("Error deleting the task:",error)
       console.error("Error deleting task:", error);
    }
  };


  return (
    <div className="  p-6 bg-black text-white m-5 rounded-2xl shadow-lg border-t-4 border-green-500 hover:shadow-green-500/40 transition-all">
      <div className="gap-1 flex flex-col">
        <h3 className="text-2xl font-bold">{task?.title || "Untitled"}</h3>
        <p>{task?.description || "No description"}</p>
        <p className="text-sm text-gray-400">
          Catogery: {task?.catogery || "None"}
        </p>
    
      </div>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>{formattedDate}</span>

        <div className="flex gap-3 text-lg">
          <button onClick = {remove}
                 className="text-red-500 hover:text-red-700 transition-colors">
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;







  {/* Status 
       
          <label htmlFor="status" className='text-xl text-emerald-500 font-medium'>Status</label>
          <input onChange={()=>{setEdits()}}
                 value={edits}
                 className='boder-2 border-emerald-500 w-50' 
                 type="text" 
                 placeholder='To-Do / On-going / Done'/>

          <button onClick = {edit}
                 className="hover:text-blue-400 transition-colors">
            <FaEdit />
          </button>

          const edit = async () => {
          const updatedTask = {
          title : task.title + "Edited", 
        };
        try {
          await axios.patch(
            `http://localhost:5000/api/updatetask/${task._id}`,
            updatedTask,
            { withCredentials: true }
          );
          dispatch(updateTask({ id: task._id, updatedTask }));
        } catch (error) {
          console.error("Error Editing task:", error);
        }
      };
       
  */}
