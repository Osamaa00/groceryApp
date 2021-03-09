require('./index');
const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const os = require('os');
const jwt=require('jsonwebtoken')
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const { mongoUrl } = require('./mongoUrl');


// users = [];

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

    if( req.headers.username && req.headers.password ){
        
        const {username,password} = req.headers;
        const user12=await User.find({username});
    
        if( user12.length == 0 ){
            salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash( password,salt );
            console.log ( `hashed password here:  ${hashed}` );
            const user = new User({username: username, password: hashed});
            user.save();
            res.json(user);
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
    
    if( req.headers.username && req.headers.password ){
            const data = await User.find({username: req.headers.username});
            console.log(data);
        if( data ){
            console.log("USERNAME: " + data[0].username);
            const { username, password } =  data[0];
            
                if( await bcrypt.compare( req.headers.password, password )){
                    if(!req.headers.token){
                        const token = await jwt.sign(username, process.env.my_secret_key);
                        const user1 = { status:'success', access: token }
                        const getUser = await active_tokens.find({ username: username });
                        if ( getUser.length > 0 ){
                            const activeDevices = getUser[0].devices;
                            const deviceId = activeDevices[activeDevices.length - 1];
                            // console.log(deviceId);
                            // activeDevices.push(deviceId + 1);
                            // console.log(activeDevices);
                            const update = await active_tokens.updateOne({username:username, token:token}, { $push: { devices: deviceId + 1 } });
                            if ( update ) res.send('successful');
                            
                            
                        }
                        else{
                            const store = new active_tokens({username:username,token:token, devices: [1]});
                            store.save();
                            res.send("successful");
                        }
                        // res.json(user1);
                        console.log("Username: " + username);
                    }
                    else if((await active_tokens.find({token:req.headers.token})).length==0){
                        res.send('titu patiyaan na ker');
                    }
                    else{
                        res.send('already loggedin')
                    }
                }
                else{
                    res.json({status:"invalid"})
                }
            // }
            // catch{
            //     res.json({status:"server error"});
    
            // }
            
        }
        else{
            res.json({status:"usererr"})       }
    }
    else{
        res.json({status:"masti"})
    }
});


app.post('/logout',async (req,res)=>{
   if(req.headers.token && req.headers.username && req.headers.deviceId){
        const data=await active_tokens.find({token:req.headers.token})
        if(data.length>0){
            if((jwt.verify(req.headers.token,process.env.my_secret_key))==req.headers.username){
                const index = data[0].devices.indexOf(req.headers.deviceId);
                delete data[0].devices[index];
                const update = await active_tokens.updateOne({token:req.headers.token}, {devices: data[0].devices});
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
    if( req.headers.token && req.headers.username && req.headers.password ){
        
        const { username, password, token } = req.headers;
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
    if(req.headers.username && req.headers.password && req.headers.new_password && req.headers.token){
        const { username, password, new_password, token } = req.headers;
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

app.post('/proceed_to_pay', async ( req , res ) => {
   const { username, password, token } = req.headers;
   if(username && password && token){
        const data = await User.find({ username: username });
        const verifypass = await bcrypt.compare( password, data[0].password );
        const verifytoken = await jwt.verify(token,process.env.my_secret_key);
        if((username == verifytoken) && verifypass){
            res.json({operation:"success",data:data});
        }
        else{
            res.json({operation:'failed'})
        }
   }
   else{
       res.send("Few parameters are missing");
   }
});


// app.get('/demo', async (req,res) => {    
//     console.log(req.get("user-agent"));
//     // console.log(os.platform());
//     // console.log(req.get("email"));
//     // console.log(req.headers['password']);
//     // console.log(req.get("content-type"));
// });


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


