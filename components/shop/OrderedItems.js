import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import CartItem from './CartItem';
import Colors from '../../constants/Colors';


const OrderedItems = (props) => {
    return (    
        <View style={styles.container}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${props.amount}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title="Show Details" 
            />    
        </View>
    )
}

export default OrderedItems

const styles = StyleSheet.create({
    container: {
        elevation: 5,
        borderRadius: 20,
        backgroundColor: "white",
        //height: 100,
        //width: "90%",
        margin: 20,
        padding: 10,
        alignItems: "center"
    },
    summary: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    totalAmount: {
        fontFamily: "Font-Bold",
        fontSize: 16,
    },
    date: {
        fontFamily: "Font-Bold",
        fontSize: 16,
        color: "#888"
    },
    details: {
        width: "100%"
    }
})


// OrdersScreen.js'de kullanacağız