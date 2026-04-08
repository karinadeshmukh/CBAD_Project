import express from "express";
import  {handleaddtask,handledeleteall,handlegettask,handletaskupdate,handledeletetask } from "../controller/task.js"


const taskrouter = express.Router()

taskrouter
.post("/addtask", handleaddtask)
.delete("/deleteall",handledeleteall ) 
.get("/gettask",handlegettask ) 
.patch("/taskupdate/:id",handletaskupdate ) 
.delete("/delete/:id",handledeletetask )

export default taskrouter 