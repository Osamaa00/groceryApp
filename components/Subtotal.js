import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Subtotal = ({ subtotal }) => {
    return (
        <View style={{alignItems:'center'}}>
            <View style = { styles.container }>
                <Text style={{color:'white', fontSize: 20}}>Subtotal: { subtotal }</Text>
            </View>
        </View>
        
    )
}

export default Subtotal;
const styles = StyleSheet.create({

    container: {
        height:50,
        borderWidth:1,
        backgroundColor:'green',
        borderRadius:10,
        width:"90%",
        alignItems:"center",
        justifyContent: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 12,
    },

});