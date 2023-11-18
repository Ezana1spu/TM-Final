// Modules
const express = require("express");
const connectDB = require("./connect");

const port = 8080;
const appName = "Task Manager";
const app = express();

// Middleware
app.use(express.static("./Client"));
app.use(express.json());

// Data model (schema)
const tasks = require("./Task");

// get all the tasks
app.get("/tm/tasks", async (req,res)=>{

  try {
    const task = await tasks.find(); 
    res.status(200).json({task});
  } catch {
    res.status(500).json({msg: error});
  };
});

//add new task
app.post("/tm/tasks", async (req,res) => {
  try {
    let newTask =
    {
      name: req.body.name,
      completed: req.body.compleated
    };
    const makeTask = await tasks.create(newTask);
    res.status(200).json({makeTask});
  } catch {
    res.status(500).json({msg: error});
  };
})

// add new task with parameter
app.all("/:name", async (req,res)=>{
  
  try {
    let newTask =
    {
      name: req.params.name,
      completed: "false"
    };
    const makeTask = await tasks.create(newTask);
    res.redirect('http://localhost:8080');
  } catch {
    res.status(500).json({msg: error});
  };
});

//delete task with parameter Id
app.delete("/tm/tasks/id/:id", async (req,res) => {
  try {
    const deleteId = req.params.id
    
    const makeTask = await tasks.findByIdAndDelete(deleteId);
    res.status(200).json({makeTask});
  } catch {
    res.status(500).json({msg: error});
  };
});

//delete task with parameter name
 app.delete("/tm/tasks:name", async (req,res) => {
  try {
    const deleteId = req.params.name
    
    const makeTask = await tasks.deleteOne(deleteId);
    res.status(200).json({makeTask});
  } catch {
    res.status(500).json({msg: error});
  };
}); 

//change value in task with parameter
app.put("/tm/tasks/id/:id", async (req,res)=>{
  try {
    const deleteId = req.params.id
    const makeTask = await tasks.findByIdAndUpdate(deleteId, req.body, {new: true});
    res.status(200).json({makeTask});
  } catch {
    res.status(500).json({msg: "error"});
  };
});

app.all("*", (req,res) => {
  res.status(404).send("<h1>Page Not Found...</h1>");
});

// Connect to the database and start the appl server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {console.log(`${appName} is listening on port ${port}.`)});
  } catch (error) {
    console.log("Hi:" + error);//CHANGE HI
  };
}

start();

