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

const Board = sequelize.define("board",{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    contents:{
        type : Sequelize.STRING,
        allowNull: false
    },
    viewCount:{
        type : Sequelize.INTEGER,
        allowNull: false
    }
});

Board.sync({force:true}) .then(() => {
    return Board.create({
        title: "홍길동",
        contents : "tmpe",
        viewCount: 2
    });
}).then( () => {
    return Board.create({
        title: "홍길동",
        contents : "tmpe",
        viewCount: 1
    });
});

router.get("/", async(req,res)=> {
    let result = await Board.findAll({
        attributes: ["title"]
    });
    res.send(result);
});
router.get("/title/:id", async(req,res)=> {
    let result = await Board.findAll({
        where:{
            id: req.params.id
        }
    });
    res.send(result);
});

router.post("/", async(req, res)=> {
    let result = false;
    try{
        await Board.create({ title: req.body.title, contents: req.body.contents, viewCount: req.body.viewCount });
        result = true;
    }catch(err){
        console.error(err);
    }
    res.send(result);
});





router.put("/:id", async(req, res) => {
    let result = false;
    try {
        await Board.update(
            {
                title: req.body.title,
                contents: req.body.contents
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
        await Board.destroy({
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