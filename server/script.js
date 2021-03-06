require('./index');
const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt=require('jsonwebtoken')
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const { mongoUrl } = require('./mongoUrl');


users = [];

mongoose.connect(mongoUrl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});


const User = mongoose.model("users");
const active_tokens = mongoose.model("active_tokens");

app.post('/users', async ( req, res ) => {

    if( req.body.username && req.body.password ){
        
        const {username,password} = req.body;
        const user12=await User.find({username});
    
        if( user12.length == 0 ){
            salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash( password,salt );
            console.log ( `hashed password here:  ${hashed}` );
            const user1 = { username, password: hashed }
            users.push( user1 );
            res.json( users );
            const user = new User({username: username, password: hashed});
            user.save();
        }
        
        else{
            res.send("User with this username already exists");
            
        }
    }

    else{
        res.send("Name or pass missing")
    }
});

app.post('/users/login', async ( req, res ) => {
    
    if( req.body.username && req.body.password ){
            const data=await User.find({username: req.body.username});
            console.log(data);
        if( data ){
            console.log("USERNAME: " + data[0].username);
            const { username, password } =  data[0];
            try{
                if( await bcrypt.compare( req.body.password, password )){
                    if(!req.body.token){
                        const token =await jwt.sign(username, process.env.my_secret_key);
                        const user1 = { status:'success', access: token }
                        const store=new active_tokens({username:username,token:token});
                        store.save();
                        res.json(user1);
                        console.log("Username: " + username);
                    }
                    else if((await active_tokens.find({token:req.body.token})).length==0){
                        res.send('titu patiyaan na ker');
                    }
                    else{
                        res.send('already loggedin')
                    }
                }
                else{
                    res.json({status:"invalid"})
                }
            }
            catch{
                res.json({status:"server error"})
            }
            
        }
        else{
            res.json({status:"usererr"})       }
    }
    else{
        res.json({status:"masti"})
    }
});
app.post('/logout',async (req,res)=>{
   if(req.body.token && req.body.username){
        const data=await active_tokens.find({token:req.body.token})
        if(data.length>0){
            if((jwt.verify(req.body.token,process.env.my_secret_key))==req.body.username){
                const del= await active_tokens.deleteOne({token:req.body.token});
                res.send('successful');
            }
            else{
                res.send("User doesnot match token")
            }    
        }
        else{
            res.send('token not valid!')
        } 
   }
   else{
       res.send('no token!')
   } 
});


app.get('/search',(req,res)=>{
    if(req.query.id){
        
    }
    
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


