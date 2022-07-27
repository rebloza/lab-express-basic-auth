const router = require("express").Router();
const userModel = require("../models/User.model");
const bcrypt = require("bcryptjs");

// ------------ REGISTRAR---------
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;

  //crear la validacion

  if (!username || !password) {
    res.render("auth/singnup", {
      errorMessage: "Debe rellenar todos los campos",
    });
    return;
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup", {
      errorMessage:
        "Tu password debe incluir 8 letras, una mayuscula y un numero.",
    });
    return;
  }
  //try
});

//----------- ACCEDER ---------

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  res.render("auth/login");
});

module.exports = router;
