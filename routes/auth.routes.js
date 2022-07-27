const router = require("express").Router();
const userModel = require("../models/User.model")
const bcrypt = require("bcryptjs")

// ------------ REGISTRAR---------
router.get("/signup", (req, res, next ) => {
    res.render("auth/signup.hbs") 
})

router.post("/signup", (req, res, next ) => {

    const { username, password } = req.body

    //crear la validacion

    if (!username || !password) {
        res.render("auth/singnup",{
            errorMessage: "Debe rellenar todos los campos"
        })

    }

    

})


//----------- ACCEDER ---------

router.get("/login", (req, res, next) => {
    res.render("auth/login.hbs")
})

router.post("/login", (req, res, next ) => {

    const { username, password } = req.body

    res.render("auth/login")
})


module.exports = router;