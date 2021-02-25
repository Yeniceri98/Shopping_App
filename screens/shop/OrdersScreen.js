import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector } from 'react-redux';
import OrderedItems from '../../components/shop/OrderedItems';


const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders)

    return (
        <FlatList 
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => (
            <OrderedItems
                amount={itemData.item.totalAmount}      // models > orders.js'deki isimlendirmeyle aynı olmalıdır (totalAmount gibi)
                date={itemData.item.readableDate}       // models > orders.js'de olduğu üzere bu kez "date" yazarsak hata verir. Date için özel olarak "readableDate" adlı bir metod oluşturup onu kullandık
                items={itemData.item.items}
            />
        )} 
    />
    )
}

export default OrdersScreen

const styles = StyleSheet.create({})