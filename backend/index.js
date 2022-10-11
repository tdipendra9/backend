import express from "express";
import mysql2 from "mysql2";
// if there is auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Good@2022';
const app= express();
const db=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Good@2022",
    database:"test",
    // multipleStatements: true
})

app.use(express.json( )) // used to send the data to db or backed via frontend / postman with raw json input
app.get("/",(req,res)=>{
    res.json("hello from the backend")
})

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{

    const q="INSERT INTO books ( `title`, `desc`,`cover`) VALUES(?)" ;
    // const values=[ "thapa history", "thap-history", "thapa is great"]; when there is no client / postman
    const values=[
        req.body.title,
        req.body.desc,
        req.body.cover
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("book has been created")
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId= req.params.id;
    const q= "DELETE FROM books WHERE id=?";
    db.query(q,[bookId],(req,res)=>{
        if(err) return res.json(err)
        return res.json("book has been deleted sucessfully! ")
    })
})
app.listen(8000,()=>{
    console.log("Connected to backend")
})