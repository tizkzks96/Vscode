const express = require("express");
const _ = require("lodash");
const app = express();
const user_router = require("./route/users");
const board_router = require("./route/boards");
const models = require("./models");
const Sequelize = require("sequelize")


app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use("/users", user_router);
app.use("/boards", board_router);



app.get("/", (req, res) => {
    res.send("hi");
});

models.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", {raw: true})
.then(() => {
    models.sequelize.sync({force:true}).then(() => {
        app.listen(3000);
    })
})