import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withOrientation } from 'react-navigation';

const CartItem = ({ name }) => {

    const [quantity, setquantity] = useState(0);

    const _storeData = async (key, flag) => {
        try {
            const dataExist = await _retrieveData( key );
            if ( dataExist ){
                if ( flag  ){
                    dataExist.quantity += 1;
                    await AsyncStorage.setItem(
                        key,
                        JSON.stringify(dataExist),
                    );
                }
                else{
                    if ( dataExist.quantity > 1 ){
                        dataExist.quantity -= 1;
                        await AsyncStorage.setItem(
                            key,
                            JSON.stringify(dataExist),
                        );
                    }
                    else if ( dataExist.quantity == 1 ){
                        console.log("helooo");
                        await AsyncStorage.removeItem( key );
                    }
    
                }
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

    async function getQuantity ( key ) {
        
        const obj  = await _retrieveData( key );
        if ( obj ){
            setquantity(obj.quantity);
        }
        // console.log(quantity);
    }
    
    getQuantity(name);

    return (
        <View style={styles.container}>
            <Image style = { styles.image } source={{ uri:"https://i.picsum.photos/id/982/200/200.jpg?hmac=X2ocb-PEJJpYgQn2Ib8SKCaWKsI-2hGcsvwZjWStNAw" }} />
            <Text style = {{ fontSize: 20 }}>{ name }</Text>
            <View style = { styles.button }>
                <Button title="-" onPress={ () => _storeData( name, false ) } color="#841584" style = { { width: 50 } }  ></Button>
            </View>
            <Text style = {{ fontSize: 20 }}>{ quantity }</Text>
            <View style = { styles.button }>
                <Button title="+" onPress={ () => _storeData( name, true ) } color="#841584"></Button>
            </View>
        </View>
    )
}

export default CartItem;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding:10,
        width: "95%",
        borderWidth: 1,
        borderColor: "yellow",
        height:200,
        backgroundColor:'dodgerblue',
        marginTop: 10,
    },

    button: {
        width: 50,
    },

    image: {
        height: 100,
        width: 100
    }
});