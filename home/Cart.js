import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import CartItem from '../components/CartItem';
import Subtotal from '.././components/Subtotal';

export default function Cart({ navigation, route }) {    
    let item = 0;    
    const [keys, setkeys] = useState([]);
    const [subtotal, setsubtotal] = useState(0);
    const [sub, setsub] = useState(0);

    route.params.update();

    const exceptions = ['credentials', 'address'];
    const getItems = async () => {
        
        const cartItems = [];
        
        try {
            await AsyncStorage.getAllKeys()
            .then(keys => keys.forEach( key => {
                // console.log("keys >>>", key);
                if ( !exceptions.includes( key ) )
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

    async function getSubtotal () {
        let total=0;
        keys.forEach(
            async key => {
                try{ 
                    
                    if ( !exceptions.includes( key ) ){
                        const data = await _retrieveData(key);
                        console.log("quantity >>> ", data.quantity);
                        // setsubtotal( subtotal + data.quantity * 100 );
                        total += data.quantity*100;
                        // console.log(data);
                        // setsubtotal(subtotal + 3 * 100);
                        console.log("this is total >>> ", total);
                        setsubtotal(total)
                    }
                    console.log( item );
                }
                catch ( error ){
                    console.log("hello > >> ", error );
                }
                
            }
        )
            // setsubtotal(arr[0]);
        console.log("this is item quanity >>> ", total );
        console.log("Final subtotal", subtotal );
        // console.log(subtotal);
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
            return <CartItem key = { item } set={setsub} se={sub} name = { item } />
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
    const check = () => {
        getSubtotal();
    }
    useEffect(() => {
        getSubtotal();
    }, [sub])
    


    return (
        <View style={{alignItems:'center'}}>
            <View style = {{ height: "90%", marginBottom: 10 }}>
                <ScrollView contentContainerStyle = {{ alignItems: "center", padding: 10 }}> 
                    { data }
                </ScrollView>
                    {
                        subtotal > 0? 
                        <Subtotal subtotal = { subtotal } /> : check()
                    }
                
            </View>
            <View style = {{ width:"90%", borderRadius:20,height:50 }}>
                <Button  
                title="Paisay Kaddo" color = "red"
                onPress = { () => checkCartStorage().then(res => res? navigation.navigate("Payment"): navigation.navigate("Login"))  }></Button>
            </View>
        </View>
    )
}

