import axios from "axios";

// Base URL for your Spring Boot backend
const DOMAIN_NAME = "http://localhost:8080";
const BASE_URL = `${DOMAIN_NAME}/api/products`;

/**
 * Get all products
 * GET /api/products
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response || error);
    throw error;
  }
};

/**
 * Get product by ID
 * GET /api/products/{id}
 */
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error.response || error);
    throw error;
  }
};

/**
 * Create new product
 * POST /api/products
 * @param {Object} productData - Example:
 * {
 *   nom: "Chocolate Cake",
 *   collection: { id: 2 },
 *   description: "Delicious dark chocolate cake",
 *   oldPrice: 25.0,
 *   newPrice: 20.0,
 *   stock: 50,
 *   image: "chocolate_cake.jpg",
 *   status: true
 * }
 */
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(BASE_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error.response || error);
    throw error;
  }
};

/**
 * Update product
 * PUT /api/products/{id}
 */
export const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response || error);
    throw error;
  }
};

/**
 * Delete product
 * DELETE /api/products/{id}
 */
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error.response || error);
    throw error;
  }
};