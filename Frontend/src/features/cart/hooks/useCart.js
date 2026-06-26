import { useContext } from "react"
import { CartContext } from "../context/cart-context"
import { getCartItems, removeCartItem, updateCartItem, addToCart } from "../services/cart-api"


export const useCart = () => {
    const context = useContext(CartContext)
    const { cartItems, setCartItems, error, setError } = context

    const handleGetCartItems = async () => {
        try {
            const response = await getCartItems();
            setCartItems(response.cartItems)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setCartItems({ items: [] });
            } else {
                setError(error.response?.data?.message || "Error fetching cart");
                throw error;
            }
        }
    }

    const handleAddToCart = async (productId, quantity, size) => {
        try {
            await addToCart(productId, quantity, size);
            await handleGetCartItems();
        } catch (error) {
            setError(error.response?.data?.message || "Error adding to cart");
            throw error;
        }
    }

    const handleUpdateCartItem = async (id, quantity) => {
        try {
            await updateCartItem(id, quantity);
            await handleGetCartItems();
        } catch (error) {
            setError(error.response?.data?.message || "Error updating cart item");
            throw error;
        }
    }

    const handleRemoveCartItem = async (id) => {
        try {
            await removeCartItem(id);
            await handleGetCartItems();
        } catch (error) {
            setError(error.response?.data?.message || "Error removing cart item");
            throw error;
        }
    }

    return {
        cartItems,
        setCartItems,
        error,
        setError,
        handleGetCartItems,
        handleAddToCart,
        handleUpdateCartItem,
        handleRemoveCartItem
    }
}