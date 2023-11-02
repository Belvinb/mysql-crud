import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"
const app = express()
app.use(express.json())
dotenv.config()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:process.env.MYSQLPWD ,
    database:"test"

})

app.get("/",(req,res)=>{
    res.json("hello this is backend")
})

app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q =  "INSERT INTO books (`title`,`description`,`cover`) VALUES (?)"
    const values = [req.body.title,req.body.description,req.body.cover]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("Book has been created succesffully")
    })
})



app.listen(process.env.PORT,()=>{
    console.log("connected to backend");
})