const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

// ------------ REGISTRAR---------
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next) => {

  const { username, password } = req.body;
  console.log(req.body)
  //crear la validacion

  if (username === "" || password === "") {
    res.render("auth/singnup", {
      errorMessage: "Debe rellenar todos los campos",
    });
    return;
  }

  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup", {
      errorMessage:
        "La contraseña debe tener 1 mayúscula, 1 número y mínimo 8 carácteres.",
    });
    return;
  }
   
  try {
    
    const foundUser = await User.findOne({ username })
    if (foundUser !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "ya esta registado"
      })
      return; 
    } 

   
    //--------  cifar la contraseña ---------
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    await User.create({
      username,
      password: hashedPassword,
    })

    res.redirect("/auth/login")

  } catch(err) {
    next(err)
  }
  
});

//----------- ACCEDER ---------

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if(username === "" || password === ""){
    res.render("auth/login", {
      errorMessage: "todos los campos deben de estar completados"
    });
    return;
  }

  try {
    const foundUserName = await User.findOne({username: username})

    if(foundUserName === null )  {
      res.render("auth/login,hbs", {
        errorMessage: "NO se encontro el usuario"
      })
      return
    }

    const passwordValid = await bcrypt.compare(password, foundUserName.password )

    if(passwordValid === false) {
      res.render("auth/login.hbs", {
        errorMessage: "La contaseña es invalida"
      })
      return;
    }

    req.session.user = {
      _id: foundUserName._id,
      username: foundUserName.username
    }

    req.session.save(()=>{
      res.redirect("/profile/main")
    })

  } catch (error) {
    next(err)
  }
  
});

module.exports = router;
