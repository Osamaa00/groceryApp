import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

const Signup = ( { navigation } ) => {

    const [utext, setutext] = useState("");
    const [ptext, setptext] = useState("");

    const signup = () => {
        console.log(utext);
        console.log(ptext);
    };

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
                <Text style={{color: "white"}} onPress = { signup }>SignUp</Text>
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