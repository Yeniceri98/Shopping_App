import { ADD_ORDER } from "../actions/ordersActions"
import Order from '../../models/orders';

const initialState = {
    orders: []
}

export default ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const newOrder = new Order(
                new Date().toString(),        // unique id'yi dummy bir şekilde oluşturduk
                action.orderData.items,
                action.orderData.amount,
                new Date()
            )

            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        
        default: {
            return state;
        }
    }
}


// CartScreen.js'deki "Order Now" butonunda dispatch yapacağız