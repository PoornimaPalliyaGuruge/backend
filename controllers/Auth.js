    const bcrypt = require("bcryptjs");
    const jwt = require("jsonwebtoken")
    const passport = require("passport");
    const User = require("../models/User");
    const {SECRET} = require("../config");

    /**
     * @DESC to register the user (ADMIN,STUDENT,FACULTY) 
     */

    const userRegister = async (userDets, role , res) =>{
    try {
        //validate the username
        let usernameNotTaken = await validateUsername(userDets.username);
        if(!usernameNotTaken){
            return res.status(400).json({
                message : `UserName is already taken. `,
                success : false
            });
    
        }
        //validate the username
        let emailNotRegistered = await validateEmail(userDets.email);
        if(!emailNotRegistered){
            return res.status(400).json({
                message : `Email is already registred `,
                success : false
            });
    
        }
    
        //Get the hashed password
        const password = await bcrypt.hash(userDets.password, 12);
        //create new user
        const newUser = new User({
            ...userDets,
            password,
            role
        });
    
        await newUser.save();
        return res.status(201).json({
            message : "Hurry!! now you are successfully registered. Please login now.",
            success : true
        });
    } catch (err) {
        //Implement logger function (winston)
        
        return res.status(500).json({
            message : "Unable to create your account. Please Try again",
            success : false
        });
    }
    };

    /**
     * @DESC to Login the user (ADMIN,STUDENT,FACULTY) 
     */

    const userLogin =  async (userCreds, role, res) => {
        let { username ,password} = userCreds 
        //check the username exsis in the database
        const user = await User.findOne({ username });

        if(!user){
            return res.status(404).json({
                message: `Username is not found. Invalid login credensials`,
                success : false
            });      
        }
        //check the role
        if(user.role != role){
            return res.status(403).json({
                message : `Please make sure you are login in right portal.`,
                success : false
            })
        }
        //that meanse the user is exsisting and trying to login correct portal
        //check the password

        let isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            //sign in
            let token = jwt.sign({
                user_id : user._id,
                role : user.role,
                user_name:user.username,
                email : user.email

            },SECRET,
            { expiresIn: "7 days" }
        );

            let result ={
                username : user.username,
                role : user.role,
                email : user.email,
                token : `Bearer ${token}`,
                expiresIn : 168
            };

        
            return res.status(201).json({
                ...result,
                message : "Hurry!! you are logged in.",
                success : true
            });

        }else{
            return res.status(403).json({
                message : `Incorrect Password`,
                success : false
            })
        }

    }

    const validateUsername = async username => {
        let user = await User.findOne({ username });
        return user ? false : true; 
    };

    /**
     * 
     * @DESC passport middleware
     */
    const userAuth = passport.authenticate("jwt",{ session: false });

    /**
     * @DESC check role middleware 
     */
    const checkRole = roles => (req, res, next) => {
        if(roles.includes(req.user.role)){
            return next();
        } else{
            return res.status(403).json({
                message : "Unauthorized",
                success : false
        });
    }
    };
    /**
     * 
     *validate email
    */
    const validateEmail = async email => {
        let user = await User.findOne({ email });
        return !user; 
    };

    const serialyzeUser = user =>{
        return{
            username: user.name,
            email: user.email,
            name: user.name,
            _id: user._id,
            updatedAt : user.updatedAt,
            createdAt : user.createdAt
        };
    };



    module.exports = {
        userAuth,
        checkRole,
        userLogin,
        userRegister ,
        serialyzeUser
    };