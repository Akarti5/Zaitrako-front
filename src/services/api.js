import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get("/api/produit/getall")
      return response.data
    } catch (error) {
      console.error("Error fetching products:", error)
      throw error
    }
  },

  async getProductsByCategory(categoryId) {
    try {
      const response = await api.get(`/api/produit/category/${categoryId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching products by category:", error)
      throw error
    }
  },
}

export const categoryService = {
  async getAllCategories() {
    try {
      const response = await api.get("/api/categorie/getall")
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  },
}

export default api
