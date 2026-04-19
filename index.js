const express = require("express");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();

const PORT = 5000;
const taskRouter = require("./routes/tasks");

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, function () {
            console.log(`app is running o PORT ${PORT} url: http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
// adding the express json middleware 
app.use(express.json());

// using the task router here
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    return res.send("hello world");
});


start();

