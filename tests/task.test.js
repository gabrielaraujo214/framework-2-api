const request = require("supertest");
const app = require("../app");
const Task = require("../../models/task");

beforeEach(async () => {
  await Task.deleteMany();
  await new Task({ title: "Test Task" }).save();
});

test("Should create a new task", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({
      title: "New Task",
    })
    .expect(201);

  // Assert that the task was created
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
});

test("Should get all tasks", async () => {
  await request(app).get("/tasks").send().expect(200);
});

test("Should get task by id", async () => {
  const task = await Task.findOne({ title: "Test Task" });
  await request(app).get(`/tasks/${task._id}`).send().expect(200);
});

test("Should update task", async () => {
  const task = await Task.findOne({ title: "Test Task" });
  await request(app)
    .put(`/tasks/${task._id}`)
    .send({ completed: true })
    .expect(200);

  const updatedTask = await Task.findById(task._id);
  expect(updatedTask.completed).toBe(true);
});

test("Should delete task", async () => {
  const task = await Task.findOne({ title: "Test Task" });
  await request(app).delete(`/tasks/${task._id}`).send().expect(200);

  const deletedTask = await Task.findById(task._id);
  expect(deletedTask).toBeNull();
});
