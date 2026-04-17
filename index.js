const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    return res.send("hello world");
})


app.listen(PORT, function () {
    console.log(`app is running o PORT ${PORT} url: http://localhost:${PORT}`);
})