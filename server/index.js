const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('mysql');

const {application,request,response} = require('express');
const add = express();
add.use(cors());
add.use(bodyParser.json());
add.use(express.json());
add.use(express.static('public'));


let a =database.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"Root",
        database:"aerele_library"
    }
)

a.connect(function(error){
    if(error){
        console.log(error);

    }
    else{
        console.log("DB connected");
    }
})

add.get('/getAllBooks',(request,response)=>{
    a.query('select * from book',(error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log(result);
            response.send(result);
        }
    })
})

add.get('/getQuantityOfBooks',(request,response)=>{
    a.query('select count(book_name) from book',(error,result)=>{
        if(error){
            console.log(error);
        }else{
            console.log(result);
            response.send(result);
        }
    })
})


//bookpage

add.post('/addBooks',(request,response)=>{
    console.log(JSON.stringify(request.body));
    let{bookName,authorName}=request.body;
    let sql='insert into book(book_name,author_name) values(?,?)'
a.query(sql,[bookName,authorName],(error,result)=>{
    if(error){
        let s ={"status":"error"};
        console.log(error);
        response.send(s);
    }else{
        let s={"status":"success"};
        response.send(s);
    }
})
})
add.put("/update/:bookId", (request, response) => {
    
    let sql = "update book set book_name='" + request.body.bookName +"',author_name='" + request.body.authorName + "' where book_id=" + request.params.bookId ;
    a.query(sql, (error, result) => {
    if (error) {
        console.log(error);
        let s={"status": "error" }
      response.send(s);
    } else {
        let s={"status": "success" }
      response.send(s);
    }
  });
});

add.delete("/delete/:bookId", (req, res) => {
    let sql = "DELETE FROM book WHERE book_id=" + req.params.bookId;
     a.query(sql, (error) => {
      if (error) {
        console.log(error);
        let s={"status": "error" }
      response.send(s);
      } else {
        let s={"status": "success" }
        response.send(s);
      }
    });
  });

add.listen(2000,()=>{
    console.log("server running in 2000 port");
})

//member
add.post('/addMembers',(request,response)=>{
    console.log(JSON.stringify(request.body));
    let{memberName}=request.body;
    let sql='insert into member(member_name) values(?)'
a.query(sql,[memberName],(error,result)=>{
    if(error){
        let s ={"status":"error"};
        console.log(error);
        response.send(s);
    }else{
        let s={"status":"success"};
        response.send(s);
    }
})
})


add.put("/update/:memberId", (request, response) => {
    
    let sql = "update member set member_name='" + request.body.memberName +"' where member_id=" + request.params.memberId ;
    a.query(sql, (error, result) => {
    if (error) {
        console.log(error);
        let s={"status": "error" }
      response.send(s);
    } else {
        let s={"status": "success" }
      response.send(s);
    }
  });
});
