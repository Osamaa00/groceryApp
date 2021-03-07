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
const inventory = mongoose.model("inventory");

app.post('/signup', async ( req, res ) => {

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
        res.send("Username or password missing")
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


app.get('/search', async (req,res) => {
    if(req.query.name){
        const value=req.query.name.toLowerCase();
        const data = await inventory.find({$or:[{name: new RegExp('^'+value)},{category:new RegExp('^'+value)}]});
        res.json(data);        
    }
});


app.post('/proceed', async (req, res)=>{
    if( req.body.token && req.body.username && req.body.password ){
        
        const { username, password, token } = req.body;
        const getPassword = await User.find({ username: username });
        if (!getPassword.length) res.send("Couldnt find you");
        const decryptPassword = await bcrypt.compare( password, getPassword[0].password );
        if ( decryptPassword ){
            const verifyToken = await jwt.verify( token, process.env.my_secret_key );
            const checkLogin = await active_tokens.find({ token: token });
            if ( checkLogin && verifyToken ){
                res.send("Party karo boi");
            }
            else{
                res.send("Daal mein kuch kala hai Daya!");
            }    
        }
        else{
            res.send("Password do not match to your account")
        }
        
    }
});

app.post('/ch_password', async (req, res) => {
    if(req.body.username && req.body.password && req.body.new_password && req.body.token){
        const { username, password, new_password, token } = req.body;
        const check = await authChangePassword( username, password, new_password, token );
        if (check){
            const deleteToken = await active_tokens.deleteOne({token: token});
            if ( deleteToken ) res.send("Password changed");
        }
        else{
            res.send("Something went wrong");
        }
    }
})

const authChangePassword = async (username, oldPass, newPass, token) => {
    const getToken = await active_tokens.find({token: token});
    if(getToken.length == 1){
        if(username == await jwt.verify(token,process.env.my_secret_key)){
            
            const us = await User.find({username:username});
            const tempPass = us[0].password;
            // console.log(">>>" + tempPass);
            const letsWait = await bcrypt.compare( oldPass, tempPass );
            // console.log(">>>" + letsWait);
            // console.log(us);
            if(us.length == 1 && letsWait){
                // console.log("Iam in")
                const anotherNewPassword = await bcrypt.hash(newPass, 10);
                const flag = await User.updateOne({username: username, password: tempPass}, {password: anotherNewPassword});
                // console.log(flag);
                return true;   
            }
            else{
                return false;
            }
        }
    }
};


// const prod1 = new inventory ({
//     name: "sunsilk",
//     category:"shampoo",
//     price: 12

// })
// prod1.save();

// const prod2 = new inventory ({
//     name: "lifebuoy",
//     category:"shampoo",
//     price: 122

// })
// prod2.save();

// const prod3 = new inventory ({
//     name: "lux",
//     category:"soap",

// })
// prod3.save();

// const prod4 = new inventory ({
//     name: "safeguard",
//     category:"soap",

// })
// prod4.save();

// const prod5 = new inventory ({
//     name: "tibet",
//     category:"soap",

// })
// prod5.save();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


