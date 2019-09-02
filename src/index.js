const express = require("express");
const app = express();
let users = [];
let user = "null";

app.use(express.json());    //  
app.use(express.urlencoded({extended:true}));

app.listen(3000);

app.get("/users", (req, res) => {
    if(user){
        res.send("user get" + user.name);
    }else{
        res.send("error")     
    }
});

app.get("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        res.send("user " + user.name+ "get");
    }else{
        res.send("error")     
    }
});

app.post("/users", (req,res)=> {
    user = req.body;
    res.send("user add"+ user.name + " post");
});
app.put("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        res.send("user "+ req.params.id + " put");
    }else{
        res.send("error")             
    }
});
app.delete("/users/:id", (req,res)=> {
    if(user && user.id == req.params.id){
        user = null
        res.send("user "+ req.params.id + " delete");
    }
    else{
        res.send("user id" + req.params.id+"not exist")
    }
});








