import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import CartItem from '../components/CartItem';

export default function Cart({ navigation, route }) {
    
    
    const [keys, setkeys] = useState([]);
    route.params.update();

    const getItems = async () => {
        
        const cartItems = [];
        try {

            await AsyncStorage.getAllKeys()
            .then(keys => keys.forEach( key => {
                // console.log("keys >>>", key);
                cartItems.push(key);
                // console.log(cartItems);
            }))
            if ( cartItems.length > 0 ){
                
                return cartItems;
            }
    
            
        } catch (error) {
            // There was an error on the native side
            console.log(error);
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

    const mapCartItems = () => {
        const getCartItems = [];
        getItems()
        .then(res => {
            if ( res ){ 
                res.forEach( key => {
                    // console.log(key);
                    getCartItems.push(key);
                } )
                setkeys(getCartItems);
            }
            else{
                setkeys([]);
            }
        })
        
        
        var items = keys.map( item => {
            // console.log(item);
            return <CartItem key = { item } name = { item } />
        } )
        // console.log("items object >>> ", items);
        return items;
    }
    
    const data = mapCartItems();

    const checkCartStorage = async () => {
        const creds = await _retrieveData('credentials');
        if( creds?.username && creds?.password && creds?.token ){
            return true;
        } 
        else{
            return false;
        }
    }

    return (
        <View style={{alignItems:'center'}}>
            <View style = {{ height: "90%", marginBottom: 10 }}>
                <ScrollView contentContainerStyle = {{ alignItems: "center", padding: 10 }}> 
                    { data }
                </ScrollView>
            </View>
            <View style = {{ width:"90%", borderRadius:20,height:50 }}>
                <Button  
                title="Paisay Kaddo" color = "red"
                onPress = { () => checkCartStorage().then(res => res? navigation.navigate("Payment"): navigation.navigate("Login"))  }></Button>
            </View>
        </View>
    )
}

