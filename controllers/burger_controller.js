const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", async function (req, res) {
    const hbsObject = { burgers: await burger.selectAll() };
    console.log(hbsObject);
    res.render("index", hbsObject);
});

router.get("/api/burgers", async function (req, res) {
    try {
        const result = await burger.selectAll(burgers);
        res.json({ burgers: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/api/burgers", async function (req, res) {
    try {
        const result = await burger.insertOne(req.body.burger_name);
        res.json({ id: result.id });
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.put("/api/burgers/:id", async function (req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    try {
        const result = await burger.updateOne({ devoured: req.body.devoured }, condition, condition);
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete("/api/burgers/:id", async function (req, res) {
    const condition = "id = " + req.params.id;
    try {
        const result = await burger.deleteOne(condition)
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Export routes for server.js to use.
module.exports = router;
