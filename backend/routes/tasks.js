const router = require("express").Router();

let Task = require("../models/task");

//localhost:8070/task/add

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

//localhost:8070/task/update/

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
