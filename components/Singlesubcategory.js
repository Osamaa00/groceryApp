import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function Singlesubcategory({ name, category }) {

    const navigation = useNavigation();
    // console.log(category);
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ styles.click } onPress={ () => navigation.navigate('Subcategory', {
                category: category,
                name: name
            })}>
                <Image style={ styles.image } source={{uri: "https://media.allure.com/photos/5893581da08420c838db6686/master/pass/haircare.jpg?mbid=social_retweet"}}/>
                <Text style={{ fontSize: 15 }}>
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
      backgroundColor: "grey",
      borderWidth: 1,
      borderColor: "black",
      alignItems: "center",
      justifyContent: "center",
      width:200,
      height:130
    },
    image:{
        width:30,
        height:30,
    },
    click:{
        alignItems:"center",
        justifyContent:'space-evenly',
        padding: 10,
        height: "100%"
    }

});