const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;
const config = require('../Config/DB_Config');

const con = config.con;
const signup = express();

signup.use(express.json());
signup.use(cors({
origin: ["http://localhost:3000"],
methods: ["GET","POST"],
credentials : true
}
)); 
signup.use(cookieParser());
signup.use(bodyParser.urlencoded({extended : true}));

signup.use(session(
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
/*
const db = mysql.createConnection(
{
    user:"root",
    host:"localhost",
    password:"Sudarshan1",
    database:"dbmsproject"
}
);
*/
signup.post('/register', (req,res)=> {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;
    const user_email = req.body.user_email;
    const cust_pincode = req.body.cust_pincode;
    const cust_phoneno = req.body.cust_phoneno;
    const cust_door_no = req.body.cust_door_no;
    const cust_street_name = req.body.cust_street_name;

    bcrypt.hash(user_password,saltRounds,(err,hash) => {

        if(err){
            console.log(err);
        }
        con.query(
            "INSERT INTO users (user_name,user_password,user_email,cust_pincode,user_role) VALUES (?,?,?,?,'2')",
            [user_name,hash,user_email,cust_pincode],
            (result)=> {
                console.log(result);
            }
        );
        con.query(
            "INSERT INTO cust_address (cust_pincode,cust_street_name,cust_door_no) VALUES (?,?,?)",
            [cust_pincode,cust_street_name,cust_door_no],
            (result)=> {
                console.log(result);
            }
        );
        con.query(
            "INSERT INTO cust_connect (cust_phone_no) values (?)",
            cust_phoneno,
            (result)=>{
                console.log(result); 
            }
        )
    })
    
});

module.exports = signup;  
