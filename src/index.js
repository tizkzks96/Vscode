const express = require("express");
const app = express();

app.listen(3000);

app.get("/", (rea, res) => {
    res.send("dqwe")
    res.send("asdfasdf")

});