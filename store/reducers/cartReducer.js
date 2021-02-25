import { ADD_TO_CART } from "../actions/cartActions";
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
}

export default cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;    // "product", cartAction.js'den geldi 
            
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            // Objenin Cart'ta (sepette) bulunduğu durum. Yani tıklanan obje sepete bir kez daha eklenmiş olacak
            if (state.items[addedProduct.id]) {         
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } 

            // Objenin Cart'ta (sepette) bulunmadığı durum. Yani tıklanan obje sepete ilk kez eklenmiş olacak
            else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);      // Bu 4 parametre cart-item.js'de oluşturduğumuz constructor'a ait  ----->  constructor(quantity, productPrice, productTitle, sum)  ----->   Buradakine göre quantity: 1 olur çünkü yeni bir item ekliyoruz. prodPrice ve prodTitle zaten normal. Son parametre (sum) ise prodPrice olur
            }

            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem  },      // [addedProduct.id]  ----->  Dynamic property
                totalAmount: state.totalAmount + prodPrice
            }
        default:
            return state;
    }
}