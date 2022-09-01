const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  
  taskName: {
    type: String,
    require: true,
  },

  taskDate: {
    type: Date,
    required: true,
  },
  

});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
