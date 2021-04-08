import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ( { navigation, route } ) => {

    // const navigation = useNavigation();
    const [utext, setutext] = useState("");
    const [ptext, setptext] = useState("");
    const login = () => {
        console.log(utext, ptext);
        setutext("");
        setptext("");
    };
    const auth = () => {
        if(utext?.length>= 4 && ptext?.length >= 4){
            fetch('http://10.0.2.2:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': utext,
                    'password': ptext,
                },
            })
            .then(res => res.json())
            .then( async verify => {
                console.log("data returned >> ", verify)
                if(verify?.status == "successful"){
                    if(verify.token && verify.deviceId){

                        const data = {
                            username: utext,
                            password: ptext,
                            token: verify.token,
                            deviceId: verify.deviceId                      
                        }
                        const setData = await AsyncStorage.setItem( "credentials", JSON.stringify( data ));
                    }
                    navigation.navigate("Home");
                }
                else{

                    console.log("invalid credentials")
                }
            })
            .catch((err)=>console.log(err));
        }
        else{
            console.log("password or username too short")
        }
    }


    // const { uname, pswd } = route.params;
    // console.log(JSON.stringify(uname));
    // console.log(JSON.stringify(pswd));

    return (
        <View style={styles.container}>
            <View style={styles.credentials}>
                <TextInput 
                    style={styles.inputs}
                    placeholder="Email"
                    value={utext}
                    onChangeText={(e) => setutext(e)}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.inputs}
                    placeholder="password"
                    secureTextEntry={true}
                    value={ptext}
                    placeholderStyle={{textAlign:"center"}}
                    onChangeText={(e) => setptext(e)}
                />
            </View>

            <View style={styles.buttonLogin}>
                <Text style={{color: "white"}} onPress={ () => auth() }>SignIn</Text>
            </View>

            <View style={styles.other}>
                <Text style={styles.blue}>Forgot Password?</Text>
                <Text style={styles.blue} onPress={() => navigation.navigate('Signup') }>Signup</Text>
            </View>
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
        marginTop: 50,
        borderRadius: 20
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
});

export default Login;