const express = require("express");
const router = express.Router();
const _ = require("lodash");
const models = require("../models");


const Board = models.board;


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