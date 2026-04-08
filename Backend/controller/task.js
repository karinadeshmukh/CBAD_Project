import taskmodel from "../model/taskmodel.js";


  async function handleaddtask (req, res)  {
  const { task, is_completed } = req.body;

const email = req.user.email

  try {
    if (!task || is_completed === undefined) {
      return res.status(400).json({
        msg: "Data is invalid.",
      });
    }

    await taskmodel.create({
      task,
      is_completed,
      added_by : email
    });

    res.status(200).json({
      msg: "Data is saved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Server is not working.",
    });
  }
};

 async function handlegettask (req, res)  {
    const email = req.user.email
  try {
    const alltask = await taskmodel.find({added_by : email});
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
};

 async function handletaskupdate (req, res)  {
    const email = req.user.email
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
};

 async function handledeletetask (req,res) {
    const email = req.user.email
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
};

async function handledeleteall (req,res) {
    const email = req.user.email
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

} ;


  export {handleaddtask,handledeleteall,handlegettask,handletaskupdate,handledeletetask }
  