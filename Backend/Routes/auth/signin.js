const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const config = require('../Config/DB_Config');

const con = config.con;
const signin = express();

signin.use(express.json());
signin.use(cors({
origin: ["http://localhost:3000"],
methods: ["GET","POST"],
credentials : true
}
)); 
signin.use(cookieParser());
signin.use(bodyParser.urlencoded({extended : true}));

signin.use(session(
    {
    key: "userId",
    secret:"test123",
    resave : false,
    saveUninitialized : false,
    cookie: {
        expires : 60*60*24,

    }
    }
))

signin.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true,user:req.session.user});
    }
    else
    {
        res.send({loggedIn:false});
    }
});

signin.post('/login', (req,res)=> {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    con.query(
        "SELECT * from users where user_name=?;",
        user_name, 
        (err,result)=> {

            if(err)
            {
                res.send({err:err});
            }
            else
            {
                if(result.length>0)
                {
                    bcrypt.compare(user_password,result[0].user_password,(error,response) =>{
                        if(response)
                        {
                            /*
                            const user_id = result[0].user_id;
                            const token = jwt.sign((user_id),"test123",{
                                expiresIn : 300
                            });
                            */
                            req.session.user = result;
                            console.log(req.session.user);
                            res.send(result);
                            //res.json({authorized: true, token: token,result:result});
                        }
                        else
                        {
                             res.send({message:"Wrong Username/Password Combination"});
                        }
                    });  

                }
                else
                {
                    res.send({message:"User Does not Exist"});
                }
            }
        }
    );
});

module.exports = signin; 