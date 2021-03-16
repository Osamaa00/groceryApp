import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CategoryResult from './CategoryResult';

export default function Categories() {

    const [categories, setcategory] = useState([])    
    const [data, setdata] = useState([]);

    const mapCategories = () => {
        var key = 0;
        if ( categories.length > 0 ){
            var ppd = categories.map(category => {
                key++;
                
                return <CategoryResult key = { key } category = {category} />
                // return <Text key = { key } >{ prodName }</Text>
            });
            return ppd;
        }
        // else{
        //     key = 0;
        //     return [<Text key = { key }>Hello</Text>]
        // }
    }

    const string = 'http://10.0.2.2:3000/categories';
    

    const fetchedCategories = [];
    fetch(string, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then( getcategories => { 

        getcategories.forEach(category => {
            fetchedCategories.push(category);

        })
        setcategory(fetchedCategories);
        setdata(mapCategories());
    })
    .catch((err)=>console.log(err));

    return (        
        <View style={ styles.container }>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'lightgrey', height: "100%", width: "100%" }} >
                
                { data }
           
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      
    },

    categoryList:{
        width:"90%",
        alignItems: "center",
        justifyContent: "center",
    },

    category: {
        fontFamily:'sans-serif',
        fontSize: 23,
    },
});
