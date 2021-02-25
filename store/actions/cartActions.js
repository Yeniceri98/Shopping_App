export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    }
}


// ProductsOverviewScreen.js ve ProductDetails.Screen.js'de dispatch yapacağız