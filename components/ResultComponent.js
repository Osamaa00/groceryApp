import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function ResultComponent({ name, products }) {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity style={ styles.container } onPress = { () =>  navigation.navigate('Product', {
                name: name,
                products: products
            })}>
                <Text>
                    { name }
                </Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
  
    container: {

        height:30,
        padding: 10,
        flex: 1,
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    
});
