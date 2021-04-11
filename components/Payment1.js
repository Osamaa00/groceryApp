import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Payment1 = () => {

    const navigation = useNavigation();

    const [house, sethouse] = useState("");
    const [street, setstreet] = useState("");
    const [area, setarea] = useState("");

    useEffect(() => {
        getdata();        
    }, [])    

    const getdata=async()=>{
        const {area,house,street} = await _retrieveData('address');
        console.log('im here')
        if(area && house && street){            
            setstreet(street);
            sethouse(house);
            setarea(area);
            console.log(">>>>",global.street)
            console.log('data is set')
        }
    }
    
    const _retrieveData = async (key) => {
        try {   
            
            const data = await AsyncStorage.getItem(key);
        
            if ( data ) {
                // console.log("data >>> ", data);
                const jsonData = JSON.parse(data);
                // console.log("printing data >>> ", jsonData);
                return jsonData;
            }
        } catch (error) {
            // There was an error on the native side
            console.log(error);
        }
    }

    const placeOrder = async ( cart, credentials ) => {
        fetch('http://10.0.2.2:3000/placeOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'cart': cart,
                    'credentials': credentials,
                },
            })
            .then(res => res.json())
            .then( async verify => {
                console.log("data returned >> ", verify)
                if(verify?.status == "success"){
                    navigation.navigate("Order");
                }
                    
            })
            .catch((err)=>console.log(err));
    }

    return (
        <View style={ styles.container }>
            <Text style = { styles.text }>Address</Text>
            <View style={ styles.textInput }>
                <TextInput 
                placeholder='Your Address Here'
                value={area}
                onChangeText = { (e) => setarea(e) }
                placeholderStyle={{textAlign:"center"}}
                />
            </View>
            <Text style = { styles.text }>Street</Text>
            <View style={ styles.textInput }>
                <TextInput 
                placeholder='Your Street Here'
                value={street}  
                onChangeText = { (e) => setstreet(e) }  
                placeholderStyle={{textAlign:"center"}}
                
                />
            </View>
            <Text style = { styles.text }>House #</Text>
            <View style={ styles.textInput }>
                <TextInput 
                placeholder='Your House no Here'
                value={house}  
                onChangeText = { (e) => sethouse(e) } 
                placeholderStyle={{textAlign:"center"}} 
                
                />
            </View>
            <Text style={styles.text}>
                CASH ON DELIVERY
            </Text>
            <View style={ styles.btn }>
                <Button title='---------------------->>>>' titleStyle={{fontWeight:'bold'}} 
                color='green' 
                onPress={ async () => await placeOrder() }></Button>
            </View>
        </View>
    )
}

export default Payment1;

const styles = StyleSheet.create({
    container: {
        height: "95%",
        width: "95%",
        alignItems:'center',
        padding:20,
        backgroundColor:"grey",
        borderRadius:10
    },
    textInput:{
        width: "100%",
        height: 70,
        borderWidth: 2,
        borderColor: "green",
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        textAlign: "center",
        backgroundColor:'white',
        

        
    },
    text: {
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        marginTop:10
    },
    btn:{
        marginTop:40,
        width:'100%',
        borderRadius:10
    }


});