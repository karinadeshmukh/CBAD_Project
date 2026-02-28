import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import taskmodel from "./models.js";

const app = express();
//const server = http.createServer(app);

const port = 8000;

app.use(cors());
app.use(express.json());

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/TodoList");
    console.log("Database is connected.");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

connectDatabase();

app.post("/addtask", async (req, res) => {
  const { task, is_completed } = req.body;
  try {
    if (!task || !is_completed) {
      return res.status(400).json({
        msg: "Data is invalid.",
      });
    }

    await taskmodel.create({
      task,
      is_completed,
    });

    res.status(200).json({
      msg: "Data is saved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server is not working.",
    });
  }
});

app.get("/gettask", async (req, res) => {
  try {
    const alltask = await taskmodel.find({});
    if (alltask.length == 0) {
      return res.status(404).json({
        msg: "Data not found.",
      });
    }

    return res.status(200).json({
      msg: "Data is successfully received.",
      alltask,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server is not working.",
    });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  const taskid = req.params.id;
  try {
    if (taskid == undefined) {
      return res.status(404).json({
        msg: "Error.",
      });
    }

    await taskmodel.findByIdAndUpdate(taskid, { is_completed: true });
    return res.status(200).json({
      msg: "Updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server Error.",
    });
  }
});

app.delete("/deletetask/:id" , async (req,res)=> {
    const id = req.params.id ; 
    try {
        if(id == undefined){
            return res.status(404).json({
                msg : "ID is invalid"
            })

        }

        await taskmodel.findByIdAndDelete(id)
        return res.status(200).json({
            msg : "Deleted successfully."
        })
        
    } catch (error) { 
        return res.status(500).json({
            msg : "Server Error."
        })
        
    }
})

app.delete("/deleteall",async (req,res)=> {
      try {
        await taskmodel.deleteMany({});
        return res.status(200).json({
            msg : "Deleted Successfully."
        })
        
      } catch (error) {
        return res.status(500).json({
            msg : "Server error."
        })
        
      }

})

app.listen(port, async () => {
  console.log("Server has started");
});
