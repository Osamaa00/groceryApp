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

    
    
    const fetchedCategories = [];
    fetch('http://10.0.2.2:3000/cate', {
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
    // console.log(fetchedCategories);
    // console.log(categories);

    return (        
       
        <ScrollView>
            
            { data }
        
        </ScrollView>
       
    )
};

const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
});
