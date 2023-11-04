import express from "express";
import mysql from "mysql"
import dotenv from "dotenv"
import cors from "cors"
const app = express()
app.use(cors({
    origin:"http://localhost:3000"
}))
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
    const q =  "INSERT INTO books (`title`,`description`,`cover`,`price`) VALUES (?)"
    const values = [req.body.title,req.body.description,req.body.cover,req.body.price]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.json(err)
        }
        return res.json("Book has been created succesffully")
    })
})


app.delete("/books/:id",(req,res)=>{
const bookId = req.params.id
const q = "DELETE FROM books WHERE id = ?"
db.query(q,[bookId],(err,data)=>{
    if(err) return res.json(err)
    return res.json("Book has been deleted succesfully")
})
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id
    const q = "UPDATE books SET `title`= ?, `description` = ?, `cover` = ?, `price` = ? WHERE id = ?"
    const values =  [req.body.title,req.body.description,req.body.cover,req.body.price]
    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated succesfully")
    })
    })



app.listen(process.env.PORT,()=>{
    console.log("connected to backend");
})