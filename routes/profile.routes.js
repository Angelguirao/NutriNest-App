const { Router } = require('express');
const router = new Router();
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');



router.get('/', (req, res) => {
    res.render('profile')
})







module.exports = router;