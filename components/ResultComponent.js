import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ResultComponent({ name, products }) {
    const navigation = useNavigation();
    return (
        <View style={styles.view}>
            <TouchableOpacity style={ styles.container } onPress = { () =>  navigation.navigate('Product', {
                name: name,
                products: products
            })}>
                <Text style={ styles.result }>
                    { name }
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        width:"100%",
        padding:10,
        borderWidth:1,
        backgroundColor:'#4F7942',
        borderColor:'#4F7942',
        borderRadius:10,
        marginBottom:10
        
        
    },
    container: {
        height:30,
        padding: 10,
        flex: 1,
        width: "100%",
        backgroundColor:'#4F7942',
        alignItems: "center",
        justifyContent: "center",
    },
    result: {
        fontFamily: "sans-serif",
        fontSize: 25,
        color:'white'
    }
});
