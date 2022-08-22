const express = require('express')
const router = express.Router()
const loginSignupCont = require("../controller/loginSignupCont")

router.post("/registerUser", loginSignupCont.registerUser)
router.post("/login", loginSignupCont.login)

module.exports = router