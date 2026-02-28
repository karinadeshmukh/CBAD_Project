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

})

const taskmodel = mongoose.model("taskmodel", taskSchema)

export default taskmodel;