const router = require("express").Router();

let Task = require("../models/task");

//adding a new task for a given date
//localhost:8070/task/

http: router.route("/").post((req, res) => {
  const taskName = req.body.taskName;
  const taskDate = new Date(req.body.taskDate);
  

  const NewTask = new Task({

    taskName,
    taskDate,
    
    
  });

  NewTask.save()
    .then(() => {
      res.json("Task Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//retrieve list of the tasks
//localhost:8070/task/

http: router.route("/").get((req, res) => {
  Task.find()
    .then((Task) => {
      res.json(Task);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Update previously added task 
//localhost:8070/task/:id

http: router.route("/:id").put(async (req, res) => {
  let taskID = req.params.id;
  //destructure
  const {
    
    taskName,
    taskDate,
   
    
  } = req.body;

  const updateTask = {
    taskName,
    taskDate,
    
   
  };

  const update = await Task.findByIdAndUpdate(taskID, updateTask)
    .then(() => {
      res.status(200).send({ status: "task Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

//delete a previously added task
//localhost:8090/task/delete/

http: router.route("/:id").delete(async (req, res) => {
  let taskID = req.params.id;

  await Task.findByIdAndDelete(taskID)

    .then(() => {
      res.status(200).send({ status: "Task syccessfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting Task", error: err.message });
    });
});


//retrieve a specific task 
//localhost:8090/task/:id

router.route("/:id").get(async (req, res) => {
  let taskID = req.params.id;
  const task = await Task.findById(taskID)
    .then((Task) => {
      res.status(200).send({ status: "Task fetched", Task });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get Task", error: err.message });
    });
});

module.exports = router;
