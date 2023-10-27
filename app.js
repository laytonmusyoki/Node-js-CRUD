const express=require('express');
const mysql=require('mysql');
const app=express();

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
})

db.connect((err)=>{
    if(err)throw err;
    console.log('db connected successfully');
})

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    let sql='SELECT * FROM blogs';
    let query=db.query(sql,(err,results)=>{
        if(err)throw err;
        res.render('index',{title:'home',results});
    })
    // res.render('index',{title:'home',blog:blog});
});

app.get('/show/:id',(req,res)=>{
    let id=req.params.id;
    let sql="SELECT * FROM blogs WHERE id=?";
    let query=db.query(sql,id,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.render('show',{title:'show',result:result});
    })
    // res.render('index',{title:'home',blog:blog});
});

app.get('/update/:id',(req,res)=>{
    let id=req.params.id;
    let sql="SELECT * FROM blogs WHERE id=?";
    let query=db.query(sql,id,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.render('update',{title:'update',result:result});
    })
    // res.render('index',{title:'home',blog:blog});
});


app.get('/delete/:id',(req,res)=>{
    let id=req.params.id;
    let sql="DELETE FROM blogs WHERE id=?";
    let query=db.query(sql,id,(err,result)=>{
        if(err)throw err;
        console.log(result);
        res.redirect('/');
    })
    // res.render('index',{title:'home',blog:blog});
});



app.get('/about',(req,res)=>{
    res.render('about',{title:'about'});
});

app.get('/addblog',(req,res)=>{
    res.render('addblog',{title:'addblog'});
});


app.post('/postblog',(req,res)=>{
    let title=req.body['title'];
    let author=req.body['author'];
    let year=req.body['year'];
    let blog=req.body['blog'];
    let data={title,author,year,blog};
    let sql=`INSERT INTO blogs SET?`;
    let query=db.query(sql,data,(err,results)=>{
        if(err)throw err;
        console.log('blog inserted successfully');
        res.redirect('/');
    })
    
});


app.post('/postupdateblog',(req,res)=>{
    let title=req.body['title'];
    let author=req.body['author'];
    let year=req.body['year'];
    let blog=req.body['blog'];
    let id=req.body['id'];
    let sql=`UPDATE blogs SET title='${title}',author='${author}',year='${year}',blog='${blog}' WHERE id=?`;
    let query=db.query(sql,id,(err,results)=>{
        if(err)throw err;
        console.log('blog updated successfully');
        res.redirect('/');
    })
    
});


app.listen(3000 ,()=>{
    console.log('app running in port 3000');
});