const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("get all");
});

router.get("/:id", (req, res) => {
    res.send("get id");
});

router.post("/", (req, res) => {
    res.send("get post");
});

router.put("/", (req, res) => {
    res.send("get put");
});

router.delete("/", (req, res) => {
    res.send("get delete");
});

module.exports = router;