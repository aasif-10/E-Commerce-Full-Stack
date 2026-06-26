import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const addToCart = async (productId, quantity, size) => {
    try {
        const response = await api.post("/api/cart", { productId, quantity, size })
        return response.data
    } catch (error) {
        throw error
    }
}

export const getCartItems = async () => {
    try {
        const response = await api.get("/api/cart")
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateCartItem = async (id, quantity) => {
    try {
        const response = await api.patch(`/api/cart/${id}`, { quantity })
        return response.data
    } catch (error) {
        throw error
    }
}

export const removeCartItem = async (id) => {
    try {
        const response = await api.delete(`/api/cart/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}