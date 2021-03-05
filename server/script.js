const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt=require('jsonwebtoken')
const app = express();
app.use(express.json());

users = [];

app.post('/users', async ( req, res ) => {

    if( req.body.name && req.body.pass ){
        
        const {name,pass} = req.body;
        const user12=users.filter(user=>user.name==name)
        console.log(name, pass);
        if( user12.length == 0 ){
            salt = await bcrypt.genSalt();
            const hashed = await bcrypt.hash( pass,salt );
            console.log ( hashed );
            const token = jwt.sign(name, process.env.my_secret_key);
            const user1 = { name: name, pass: hashed, access: token }
            users.push( user1 );
            res.json( users );
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
    if( req.body.name && req.body.pass ){
        const { name, pass } = req.body;
        const user = users.find( u => u.name == name ); ////db here
        if( user ){
            try{
                // const loop=await bcrypt.compare(pass,user.pass);
                if( await bcrypt.compare( pass, user.pass )){
                    res.send("password matches");
                }
                else{
                    res.send('password is not correct')
                }
            }
            catch{
                    res.send('something went worong');
            }
            
        }
        else{
            res.send('tu mera puth chuti kr(no user with that name)')
        }
    }
    else{
        res.send("Name or pass missing")
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


