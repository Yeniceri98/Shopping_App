import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions";
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
        
            case REMOVE_FROM_CART:
                const selectedCartItem = state.items[action.pid];     // "pid", cartAction.js'den geldi
                
                const currentQty = selectedCartItem.quantity;
    
                let updatedCartItems;
    
                // Eğer sepete eklenen ürün 1'den fazlaysa, delete butonuna basınca tamamını silmez ve o itemden 1 eksiltir
                if (currentQty > 1) {
                    const updatedCartItem = new CartItem(
                        selectedCartItem.quantity - 1,
                        selectedCartItem.productPrice,
                        selectedCartItem.productTitle,
                        selectedCartItem.sum - selectedCartItem.productPrice
                    )
    
                    updatedCartItems = { ...state.items, [action.pid]: updatedCartItem }
                }
    
                // Eğer sepete eklenen üründen 1 adet varsa, delete butonuna basınca tamamı silinir
                else {
                    updatedCartItems = { ...state.items };
                    delete updatedCartItems[action.pid]
                }
    
                return {
                    ...state,
                    items: updatedCartItems,
                    totalAmount: state.totalAmount - selectedCartItem.productPrice
                }
        default:
            return state;
    }
}