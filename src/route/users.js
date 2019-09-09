const express = require("express");
const router = express.Router();
const _ = require("lodash");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_example", "root", "0000",{ hotst: "localhost", dialect: "mysql"});
const check_sequlize_auth = async() =>{
    try{
        await sequelize.authenticate();
        console.log("연결  성공");

    }catch(err){
        console.log("연결 실패", err);
    }
};
check_sequlize_auth();

const User = sequelize.define("user",{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type : Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force:true}) .then(() => {
    return User.create({
        name: "홍길동",
        address: "seoul"
    });
}).then( () => {
    return User.create({
        name: "김철수",
        address: "anyang"
    });
});


let users = [{
    id: 1,
    name: "홍길동"
},{
    id: 2,
    name: "강철수"
}];;

router.get("/", async(req,res)=> {
    let result = await User.findAll({
        attributes: ["name"]
    });
    res.send(result);
});
router.get("/address/:address", async(req,res)=> {
    let result = await User.findAll({
        where:{
            address: req.params.address
        }
    });
    res.send(result);
});

router.post("/", async(req, res)=> {
    let result = false;
    try{
        await User.create({ id: req.body.id, name: req.body.name, address: req.body.address });
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});





router.put("/:id", async(req, res) => {
    let result = false;
    try {
        await User.update(
            {
                name: req.body.name,
                address: req.body.address
            }, {
                where: {
                    id: req.params.id
                }
            }
        );
        result = true;
    } catch (err) {
        console.error(err);
    }

    res.send(result);
});

router.delete("/:id", async(req, res) => {
    let result = false;
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        result = true;
    } catch (err) {
        console.error(err);
    }
    res.send(result);
});
module.exports = router;