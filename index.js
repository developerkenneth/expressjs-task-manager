const express = require("express");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();

const PORT = 5000;
const taskRouter = require("./routes/tasks");
app.use(express.static("./public"));

// adding the express json middleware 
app.use(express.json());

// 2. If you are sending data via HTML Forms (url-encoded), add this too:
app.use(express.urlencoded({ extended: false }));

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


// using the task router here
app.use("/api/tasks", taskRouter);

app.get("/", (req, res) => {
    return res.send("hello world");
});


start();

