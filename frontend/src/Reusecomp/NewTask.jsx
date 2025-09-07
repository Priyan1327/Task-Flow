import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Slices/SliceTask";
import axios from "axios"

import { ImCross } from "react-icons/im";


function NewTask( { onClose } ) {

  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [catogery , setCatogery] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title , description , catogery };

    try {
      // ✅ Send to backend
      const res = await axios.post("http://localhost:5000/api/newtask", newTask, { 
            withCredentials : true
      });
      
      // ✅ Update Redux with response (saved task)
      dispatch(addTask(res.data.data));

      // Clear form
      setTitle("");
      setDescription("");
      setCatogery("");

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="mt-10 fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-20 z-10">
      
      <div className="bg-white/10 backdrop-blur-lg border border-gray-500 rounded-2xl shadow-xl w-full max-w-lg p-8">

        <div className='flex justify-between'>

          <h2 className="text-2xl font-bold text-white mb-6 text-center"> Add New Task </h2>

          <div>
            <button onClick = { onClose } className='text-red-500 hover:text-red-700 transition-colors' ><ImCross /></button>
          </div>

        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-xl font-medium text-balck mb-1">Task Name</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-400  px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xl font-medium text-black mb-1">Description</label>
            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="  w-full rounded-lg border border-gray-400 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xl font-medium text-black mb-1">Category</label>
            <input
              type="text"
              placeholder="e.g. Frontend / Backend / etc"
              value={catogery}
              onChange={(e) => setCatogery(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewTask;
