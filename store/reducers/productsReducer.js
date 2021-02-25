import PRODUCTS from '../../data/dummy-data';      // Bir şeyler görüntüleyebilmek amacıyla dummy data kullandık
import { DELETE_PRODUCT } from '../actions/productsActions';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')       // ownerId'nin "u1" olduğu productları listeler (Bir eşyler görüntüleyebilmek amacıyla şimdilik böyle kullandık)
}

export default productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_PRODUCT:        // cartReducer.js'de de bu action'ı tanımladık. Çünkü cart kısmından da silinecek
            return {
                ...state,
                userProducts: state.userProducts.filter(
                    product => product.id !== action.pid
                ),
                availableProducts: state.availableProducts.filter(
                    product => product.id !== action.pid
                )
            }
    }
    return state;
} 


// "availableProducts", ProductDetailScreen.js'de kullanılacak
// "userProducts", UserProductsScreen.js'de kullanılacak