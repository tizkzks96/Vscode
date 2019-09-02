const express = require("express");
const _= require("lodash");
const app = express();
let users = [{
	"id": 0,
	"name": "asd"
 },
 {
	"id": 1,
	"name": "홍길동"
 }
 ];
let user = "null";





app.use(express.json());    //  
app.use(express.urlencoded({extended:true}));

app.listen(3000);

app.get("/", (req, res) => {
        res.send("hi");
});
app.get("/users", (req, res) => {
    let msg = "asd ";
    res.send({msg , result : users});

    if(users){
        res.send("user get" + users.name);
    }else{
        res.send("error")     
    }


});

app.get("/users/:id", (req,res)=> {
    if(users && user.id == req.params.id){
        res.send("user " + users.name+ "get");
    }else{
        res.send("error")     
    }
});

app.post("/users", (req,res)=> {
    const check_user = _.find(users, ["id", req.params.id]);
    let msg = req.body.id+" 아이디를 가진 유저가 이미 존재합니다.";
    let success = false;
    if(!check_user){
        users.push(req.body);
        msg = req.body.name+" 유저가 추가되었습니다.";
        success = true;
    }
    res.send({msg, success})
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








