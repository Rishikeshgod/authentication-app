const express = require("express");
const { signup, login, verifytoken, getUser, refreshToken } = require("../controllers/user_controllers");

const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.get("/user",verifytoken,getUser);
router.get("/refresh",refreshToken,verifytoken,getUser);


module.exports = router;