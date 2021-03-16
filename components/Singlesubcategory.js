import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Singlesubcategory({ name }) {

    const navigation = useNavigation();
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.click } onPress={ navigation.navigate('Subcategory') }>
                <Image style={ styles.image } source={{uri: "https://media.allure.com/photos/5893581da08420c838db6686/master/pass/haircare.jpg?mbid=social_retweet"}}/>
                <Text>
                    {name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "blue",
      alignItems: "center",
      justifyContent: "center",
      width:200,
      height:200
    },
    image:{
        width:30,
        height:30,
    },
    click:{
        alignItems:"center",
        justifyContent:'space-evenly',
        padding: 10,
    }

});