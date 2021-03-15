import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function Category({ name }) {
    return (
        <View>
            <Text>{ name }</Text>
        </View>
    )
};
