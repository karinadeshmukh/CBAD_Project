import usermodel from "../model/usermodel.js";
import bcrypt from "bcrypt";  
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
async function create_account (req,res) {
    try {
      const {email,password} = req.body ;
      if(!email || !password){
        return res.status(400).json({
            msg : "Error." 
        })
      } 
      
      const hashpassword = await bcrypt.hash(password,10) 
      await usermodel.create({
        email : email ,
        password : hashpassword
        
      })

      return res.status(200).json({
        msg : "User created."
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "Server Error." 
        })
        
    }
}

async function login (req, res) {
    try {
        const {email,password} = req.body ;
      if(!email || !password){
        return res.status(400).json({
            msg : "Error." 
        })
      } 
      
     const isExist= await usermodel.findOne({email : email})
     if (!isExist){
        return res.status(404).json({
            msg : "User not found."
        })
     }

     const isCompare = await bcrypt.compare(password,isExist.password )
      if (!isCompare){
        return res.status(400).json({
          msg : "Wrong Password."
        })
      }   
      
     const token = jwt.sign(
            { email: isExist.Email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

      return res.status(200).json({
        msg : "Ok." ,
        token
      })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg : "Server Error." 
        })
        
    }
}

export{create_account, login}