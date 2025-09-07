import Login from "../models/Login.js";
import Task from "../models/task.js"
import jwt from "jsonwebtoken" 

//------------------Public APIs-----------------------------------------

// Login User
  export const loginuser = async (req , res) => {
  try{
    
    const {username , password , role} = req.body;

    console.log("Recived Login :",username,password, role);
    
    // 1st - Step 
    if(!username || !password){
      return res.status(400).json({success : false , message : "Username or Password is Required"})
    };

    // 2nd - Step
    const user = await Login.findOne({username});

    console.log("founded :", user );

    if(!user){
      return res.status(401).json({success : false , message : `${user} is Not Found`})
    };

    // 3rd - Step 
    if(user.password !== password){
        return res.status(402).json({success : false , message : "The Password is incorect"})
    };
    
    // 4th - Step Generating JWT
    const jwtToken = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY || "mySecretKey");

    // 5th - Storing in cookies
      res.cookie("token", jwtToken, {
      httpOnly: true, // cannot be accessed by JS
      secure: false,  // true in production (HTTPS)
      sameSite: "lax",
    });
    // 6th - Step Respond Sending
    return res.status(200).json({success : true , token : jwtToken , role : user.role}); 
  } catch(error){
    console.log("Login Error : ", error)
    res.status(500).json({success : false , message : "Internal Server Error"})
  }
  };

// Register new User for New people 

  export const newuser = async (req, res) => {
    const { username, email, password , role } = req.body;

    // Validate input
    if (!username || !email || !password  || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email, and password",
      });
    }

    try {
      // Create new user
      const newUser = new Login({ username, email, password , role });
      await newUser.save();

      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      console.error("Error creating user:", error);

      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Username or email already exists",
        });
      }

      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  
//------------------------------------------------------

//------------------Privite APIs------------------------------------------

// Create new task
  export const newtask =  async (req, res) => {

    const { title, description, catogery } = req.body;

    if (!title || !description || !catogery) {
      return res.status(400).json({ success: false, message: "Please provide all fields for a new task"});
    }

    try {
      const newTask = new Task({ title, description, catogery });
      await newTask.save();
      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      console.error("Error creating task:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

// Delete Task 
  export const deletetask = async (req, res) => {

    const {id} = req.params;
      
    try{

      const task = await Task.findByIdAndDelete(id);

      if(!task){
        res.status(404).json({success : false , message : "Cannot Find The Task"})
      }
      res.status(200).json({success : true , message : "Task is deleted"})
    }catch(error){
      res.status(500).json({success : false , message : error.message})
    }
  };

// Get Task
  export const get_task = async (req , res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }  
  };

// Update - Task
  export const updatetask = async (req , res) => {

    try {
      const { id } = req.params;

      // Find task by id and update with request body
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: req.body }, // only update fields provided
        { new: true, runValidators: true } // return updated doc + validate schema
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Editing All Task
  export const changeTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTask = await Task.findByIdAndUpdate( id , req.body, { new: true, overwrite: true, runValidators: true } // overwrite replaces the whole doc
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    };
  };
 

//------------------------------------------------------