const router = require( "express" ).Router();
//Bring in the User Registration function
const { userRegister, userLogin , userAuth, serialyzeUser,checkRole } = require( "../utils/Auth" );


//Student regiatration route 
router.post("/register-student", async( req,res ) => {
    await userRegister(req.body, 'student',res);
});

//Admin registration route 
router.post("/register-admin", async( req,res ) => {
    await userRegister(req.body, 'admin',res);
});

//Faculty registration route
router.post("/register-faculty", async( req,res ) => {
    await userRegister(req.body, 'faculty',res);
});


//Student Login route 
router.post("/login-student", async( req,res ) => {
    await userLogin(req.body,'student',res)
});
//Admin Login route 
router.post("/login-admin", async( req,res ) => {
    await userLogin(req.body,'admin',res)
});
//Faculty Login route
router.post("/login-faculty", async( req,res ) => {
    await userLogin(req.body,'faculty',res)
});


//profile route
router.get("/profile", userAuth, async( req, res )=>{
    return res.json(serialyzeUser(res.user));
});


//Student protected route 
router.get("/student-protected",userAuth,checkRole(["student"]) , async( req,res ) => {
   return res.json("Hello Student!!");
});
//Admin protected route 
router.get("/admin-protected",userAuth, checkRole(["admin"]) , async( req,res ) => {
    return res.json("Hello Admin!!");
});
//Faculty protected route
router.get("/faculty-protected",userAuth, checkRole(["faculty"]) , async( req,res ) => {
    return res.json("Hello Faculty!!");
});

router.get("/admin-protected-and-faculty-protected",userAuth, checkRole(["admin","faculty"]) , async( req,res ) => {
    return res.json("Hello Admin and faculty!!");
});

module.exports = router;