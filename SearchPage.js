import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';


export default function SearchPage({ navigation }) {

    const fun = () => {
        var key = 0;
        if ( fetchedData.length > 0 ){
            var ppd = fetchedData.map(d => {
                key++;
                return <Text key = { key }>{d}</Text>
            });
            return ppd;
        }
        // else{
        //     key = 0;
        //     return [<Text key = { key }>Hello</Text>]
        // }
    }

    const [newst, setnewst] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [fetchedData, setdata] = useState([]);
    
    const fetch_data = async (name) => {

        if ( name != "" ){

            const fetchedProducts = [];
            const string = "http://10.0.2.2:3000/search?name="+ name;
            console.log(string);
            const response = await fetch(string, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(r=>r.json())
            .then( data => { 

                data.forEach(product => {fetchedProducts.push(product.name)} 
                )
            })
            .catch((err)=>console.log(err));
            setdata(fetchedProducts);
        }
        else{
            // setSearchText("");
            setnewst([<Text key = { 0 }>Hello</Text>]);
            console.log("asd");
        }
    };
    
    useEffect(() => {
        fetch_data(searchText);
        setnewst(fun());
        return () => {
            
        }
    }, [searchText])

    


    return (
        <View style={styles.container}>
            <TextInput 
            placeholder="Search Here"
            onChangeText={ (e) => setSearchText(e) }
            >
            </TextInput>
            { newst }
            
        </View>
    )
};

// <FlatList 
// data={ fetchedData }
// renderItem={ renderProduct }
// />
const styles = StyleSheet.create({
  
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
  });

//   <Text onPress={()=>setnewst(fun())}>Submit</Text>
    // console.log(fetchedData);

    // var key = 0;
    // if ( fetchedData.length > 0 ){
        
    //     var result = fetchedData.map( item => {
    //         key++;
    //         console.log(item);
    //         return <Text key={ key }>{ item }</Text>
    //     } );

    // }

    // const Item = ({ name }) => {
    //     <View style={styles.item}>
    //         <Text style={styles.title}>{name}</Text>
    //     </View>
    // }

    
    // const renderProduct = ({ item }) => {
    //     return (
    //         <Item name={ item.name }/>
    //     );
    // };