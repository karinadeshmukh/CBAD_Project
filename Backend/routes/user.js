import express from "express";
import { create_account , login  } from "../controller/user.js";


const userrouter = express.Router()

userrouter
.post("/signup", create_account)
.post("/login", login) 

export default userrouter 