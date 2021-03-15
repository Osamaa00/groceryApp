import * as React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


export default function CategoryResult({ name }) {

    const [press, setpress] = useState(false)
    const checkPress = () => {
        if ( press ){
            return <Text>Pressed</Text>
        }
    };
    const navigation = useNavigation();
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={styles.categoryList} onPress = { () =>press? setpress(false) : setpress(true) }>
                <Image style={{width:40,height:40}} source={{ uri: 'https://media.allure.com/photos/5893581da08420c838db6686/master/pass/haircare.jpg?mbid=social_retweet' }} />
                
                <Text style={ styles.category }>
                    {name}
                </Text>

                <Icon name="arrow-down" size={25} color="black" />
            </TouchableOpacity>
            { checkPress() }
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
      width:"100%",
      marginBottom:100,
      padding:20,
      borderRadius:10,
      flexDirection:"row",
      height:"40%"
    },

    categoryList:{
        height:"100%",
        width:"100%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection:'row',
        backgroundColor:'red'
    },

    category: {
        fontFamily:'sans-serif',
        fontSize: 23,
    },
});