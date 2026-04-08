import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        required : true 
    },

    is_completed:{
        type : String , 
        required : true,
        default: false
    },

    added_by:{
        type: String ,
        required :true 
    }

})

const taskmodel = mongoose.model("taskmodel", taskSchema)

export default taskmodel;