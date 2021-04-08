import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ( { navigation } ) => {

    const [utext, setutext] = useState("");
    const [ptext, setptext] = useState("");

    const signup = () => {
        console.log(utext);
        console.log(ptext);
    };

    const signUser = () => {
        if(utext?.length>= 4 && ptext?.length >= 4){
            fetch('http://10.0.2.2:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': utext,
                    'password': ptext,
                },
            })
            .then(res => res.json())
            .then( verify => {
                console.log("data returned >> ", verify)
                if(verify?.status == "success"){
                    navigation.navigate("Login");
                }
                else if(verify?.status=='user exists'){
                    console.log("Username Already Taken")
                }
                else{
                    console.log("Something went wrong")
                }
            })
            .catch((err)=>console.log(err));
        }
        else{
            console.log("password or username too short")
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.credentials}>
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    value={utext}
                    keyboardType="email-address"
                    onChangeText={(e) => setutext(e)}
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="password"
                    value={ptext}
                    placeholderStyle={{textAlign:"center"}}
                    secureTextEntry={true}
                    onChangeText={(e) => setptext(e)}
                />
            </View>
            <View style={styles.buttonLogin}>
                <Text style={{color: "white"}} onPress = { () => signUser() }>SignUp</Text>
            </View>

            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Go to login page" onPress={() => navigation.navigate('Login', { uname: utext, pswd: ptext })} />
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        padding: 10,
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inputs: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 2,
        width: "80%",
        textAlign: "center",
        
    },
    credentials:{
        alignItems:"center",
        width:"80%",
        borderWidth:1,
        borderColor:"gray",
        borderRadius:5,
        padding:10,
    },

    blue: {
        color: "blue",
        textDecorationLine: "underline",
        textDecorationColor: "blue",
    },

    other: {
        display: "flex",
        flexDirection: "row",
        width: "50%",
        justifyContent: "space-evenly",
    },
    
    buttonLogin: {
        backgroundColor: "#fc5c65",
        marginTop: 50,
        alignItems: "center",
        height: 30,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 50,
        width: 80,
    },

    navButtons: {
        margin: 10,
    },
});

export default Signup;