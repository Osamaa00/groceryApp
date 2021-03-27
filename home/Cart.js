import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import CartItem from '../components/CartItem';

export default function Cart({ navigation, route }) {
    

    const [keys, setkeys] = useState([]);    
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

    const mapCartItems = () => {
        const getCartItems = [];
        getItems()
        .then(res => { 
            res.forEach( key => {
                console.log(key);
                getCartItems.push(key);
            } )
           setkeys(getCartItems);
        })
        
        var items = keys.map( item => {
            console.log(item);
            return <CartItem key = { item } name = { item } />
        } )
        console.log("items object >>> ", items);
        return items;
    }
    
    
    return (
        <ScrollView> 
            { mapCartItems() }
        </ScrollView>
    
    )
}

