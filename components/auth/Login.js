import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';


const Login = ( { navigation, route } ) => {

    const [utext, setutext] = useState("");
    const [ptext, setptext] = useState("");
    const login = () => {
        console.log(utext, ptext);
        setutext("");
        setptext("");
    };

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
                <Text style={{color: "white"}} onPress={login}>SignIn</Text>
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