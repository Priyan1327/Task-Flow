import express from "express"
import {  newuser , deletetask , loginuser , get_task , newtask , updatetask , changeTask } from "../APIs/controler.js";
import { checkRole, verifyToken } from "../Middleware/tokek.js";



const router = express.Router();

// Public Routes
     router.post("/login" , loginuser) // login user

     router.post("/register" , newuser) // New Register 


// Protected Routes
     
     router.get("/tasks" , verifyToken , get_task) // Get all Task

     router.post("/newtask", verifyToken , checkRole("TL") ,  newtask) // New Task 

     router.patch("/updatetask" , verifyToken , checkRole("TL", "Member") , updatetask  ) // Updating a Priority Status

     router.put("/changetask" , verifyToken  ,  checkRole("TL","Member") , changeTask) // Editing Whole Task

     router.delete("/delete/:id" , verifyToken , checkRole("TL") , deletetask) // deleteing Task




export default router; 