const express = require("express");
const app = express();
const PORT = 5000;
const taskRouter = require("./routes/tasks");


// adding the express json middleware 
app.use(express.json());

// using the task router here
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    return res.send("hello world");
});




app.listen(PORT, function () {
    console.log(`app is running o PORT ${PORT} url: http://localhost:${PORT}`);
})