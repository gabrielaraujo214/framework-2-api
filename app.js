const express = require("express");
const taskRouter = require("./routes/task");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
