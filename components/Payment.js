import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { View, Text } from 'react-native';

const Payment = ({ navigation }) => {
    const [Login, setLogin] = useState(false)
    const _retrieveData = async (key) => {
        try {               
            const data = await AsyncStorage.getItem(key);
            
            if ( data ) {
                const jsonData = JSON.parse(data);
                return jsonData;
            }
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }

    const checkLogin = async () => {
        const creds = await _retrieveData('credentials');
        if( creds?.username && creds?.password && creds?.token ){
            console.log(creds.username)
            console.log(creds.password)
            console.log(creds.token)
            fetch('http://10.0.2.2:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': creds.username,
                    'password': creds.password,
                    'token': creds.token,
                },
            })
            .then(res => res.json())
            .then( verify => {
                console.log("data returned >> ", verify)
                if(verify.status == "200"){
                    setLogin(true)
                    // console.log("i am here");
                }
            })
            .catch((err)=>console.log(err));
        } 
        else{
            setLogin(false);
        }
    }
    checkLogin();
    return (
        <View>
            {Login?<Text>I reached HERE!</Text>:<Text>Titopati</Text>}
        </View>
    )
}

export default Payment;
