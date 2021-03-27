import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ResultComponent from './components/ResultComponent';
// import { FlatList } from 'react-native-gesture-handler';


export default function SearchPage({ navigation }) {

    const fun = () => {
        var key = 0;
        if ( fetchedData.length > 0 ){
            var ppd = fetchedData.map(prodName => {
                key++;
                // console.log(prodName);
                return <ResultComponent key = { key } name = { prodName.name } products = { prodName } />
                // return <Text key = { key } >{ prodName }</Text>
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
            // console.log(string);
            const response = await fetch(string, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(r=>r.json())
            .then( data => { 

                data.forEach(product => {
                    fetchedProducts.push(product);
                    // console.log(product);

                })
            })
            .catch((err)=>console.log(err));
            setdata(fetchedProducts);
            // console.log("chal bey");
            // console.log(fetchedProducts);
        }
        else{
            // setSearchText("");
            setnewst([<Text key = { 0 }>Hello</Text>]);
            // console.log("asd");
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
            <View style={styles.searchBarView}>
                <TextInput style={styles.searchBar}
                placeholder="Search Here"
                onChangeText={ (e) => setSearchText(e) }
                >
                </TextInput>
            </View>
            
            <ScrollView style={{ width: "100%" }}>
                { newst }   
            </ScrollView>
            
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
    searchBarView: {
        flexDirection:"row",
        width:"100%",
        padding: 20,
        borderWidth:1,
        borderColor:'#4F7942',
        justifyContent:'center',
        marginBottom:20,
        borderRadius:10
    },
    searchBar:{
        height: 40,
        width:"80%",
        textAlign:'center'
    }
    ,
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