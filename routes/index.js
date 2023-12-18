const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log("aara");
    return res.status(200).json({ success: true,  message: "Server is working.", res: {} });
});

module.exports = router;
