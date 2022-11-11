const { Signup, Signin } = require("../controller/User");

const router = require("express").Router();

router.post("/signup", Signup);
router.post("/signin", Signin);

module.exports = router;
