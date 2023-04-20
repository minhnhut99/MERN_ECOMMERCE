const express = require("express");
const router = new express.Router();

router.use("/api/v1", require("./RouterProduct"));
router.use("/api/v1", require("./RouterUser"))

module.exports = router;
