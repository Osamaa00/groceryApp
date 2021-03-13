import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';

export default function Products({ navigation, route }) {

    const { name, products } = route.params;
    return (
        <View>
            <Text>
                { products.name }
            </Text>
        </View>
    )
}


    