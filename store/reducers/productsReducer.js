import PRODUCTS from '../../data/dummy-data';      // Bir şeyler görüntüleyebilmek amacıyla dummy data kullandık
import Product from '../../models/products';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/productsActions';

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
        
        case CREATE_PRODUCT:
            const newProduct = new Product(     // models > products.js'deki sıralamaya göre gitmeliyiz
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageURL,
                action.productData.description,
                action.productData.price
            )
            
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case UPDATE_PRODUCT:
            // User Product ve Available User Product için index bulma
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid);
            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)
            
            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,                   // Güncelliyor
                action.productData.imageURL,                // Güncelliyor
                action.productData.description,             // Güncelliyor (Diğerleri güncelleme yapmıyor)
                state.userProducts[productIndex].price,
            )
            
            // Update User Products
            const updatedUserProducts = [...state.userProducts];    
            updatedUserProducts[productIndex] = updatedProduct;

            // Update Available Products
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
    return state;
} 


// "availableProducts", ProductDetailScreen.js'de kullanılacak
// "userProducts", UserProductsScreen.js'de kullanılacak