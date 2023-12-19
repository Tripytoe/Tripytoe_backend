const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");
const { testUserAPI, GoogleSignIn, CreateUser, UnApproveUser, ResetPasword, VarifyEmail, LogInUser, GoogleLogIn, UpdateUser, DeleteUser, GetNewUsers, GetUserById, GetUsers, GetCurrentUser, ApproveUser } = require("../controllers/user");

//@desc Google Sign In API
//@route POST /api/v1/user/googlesignin
//@access Public
router.post("/googlesignin", [body("name", "Enter a valid name").isLength({ min: 3 }), body("email", "Enter a Valid Email").isEmail(), body("googleId")], GoogleSignIn);

//@desc Test User API
//@route GET /api/v1/user
//@access Public
router.get("/", testUserAPI);

//@desc Reset Password API
//@route GET /api/v1/resetpassword
//@access Public
router.post(
  "/resetpassword",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter New Password").isLength({
      min: 5,
    }),
  ],
  ResetPasword
);
//@desc Varify Email  API
//@route GET /api/v1/user/varifyemail
//@access Public
router.post("/varifyemail", [body("email", "Enter Valid Email").isEmail()], VarifyEmail);

//@desc Google LogIn API
//@route GET /api/v1/user/googlelogin
//@access Public
router.post("/googlelogin", [body("email", "Enter Valid Email").isEmail()], GoogleLogIn);

//@desc Create User API
//@route POST /api/v1/user/add
//@access Public
router.post(
  "/add",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("mobile_no", "Enter a Valid Whatsapp Number").notEmpty().isNumeric(),
    body("password", "Password must have atlest 5 character").isLength({
      min: 5,
    }),
    body("whatsapp_status"),
    body("whatsapp_no"),
    body("instagram"),
    body("facebook"),
    body("googleId"),
  ],
  CreateUser
);

//@desc LogIn User API
//@route GET /api/v1/user/login
//@access Public
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Password Is Incorrect").isLength({
      min: 5,
    }),
  ],
  LogInUser
);

//@desc Update User API
//@route GET /api/v1/user/update
//@access Public
router.post(
  "/update/:id",
  [
    body("name", "Enter a valid name").isLength({
      min: 3,
    }),
    body("mobile_no", "Enter a Valid mobile Number").notEmpty().isNumeric(),
    body("whatsapp_no"),
    body("instagram"),
    body("facebook"),
    body("whatsapp_status"),
  ],
  UpdateUser
);

//@desc Delete User API
//@route GET /api/v1/user/delete
//@access Public
router.post("/delete/:id", validateToken, DeleteUser);

//@desc Get User Info API
//@route GET /api/v1/user/get/:id
//@access Public
router.get("/get/:id", GetUserById);

//@desc Get All Users API
//@route GET /api/v1/user/getallusers
//@access Public
router.get("/getallusers", GetUsers);

//@desc Get New Users API
//@route GET /api/v1/user/getnewusers
//@access Public
router.get("/getnewusers", GetNewUsers);

//@desc Get Current User API
//@route GET /api/v1/user
//@access Public
router.get("/getcurrentuser", validateToken, GetCurrentUser);

//@desc Update User API
//@route POST /api/v1/user/updateprofile/:id
//@access Public
//router.post("/updateprofile/:id", [body("newProfile", "Profile picture not found").notEmpty()], UpdateProfile);

//@desc Approve Users API
//@route POST /api/v1/user/approve/:id
//@access Public
router.post("/approveuser/:id", ApproveUser);

//@desc UnApprove Users API
//@route POST /api/v1/user/unapprove/:id
//@access Public
router.post("/unapproveuser/:id", UnApproveUser);

module.exports = router;
