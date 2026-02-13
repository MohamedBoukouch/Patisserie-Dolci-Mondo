import axios from "axios";

// Base URL for your Spring Boot backend
const DOMAIN_NAME = "http://localhost:8080";
const BASE_URL = `${DOMAIN_NAME}/api/collections`;

/**
 * Get all collections
 * GET /api/collections
 */
export const fetchCollections = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Array of collections
  } catch (error) {
    console.error("Error fetching collections:", error.response || error);
    throw error;
  }
};

/**
 * Get collection by ID
 * GET /api/collections/{id}
 */
export const getCollectionById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collection:", error.response || error);
    throw error;
  }
};

/**
 * Create new collection
 * POST /api/collections
 * @param {Object} collectionData - Example:
 * {
 *   name: "Chocolates",
 *   description: "All chocolate products",
 *   imageUrl: "http://localhost:8080/images/chocolates.jpg"
 * }
 */
export const createCollection = async (collectionData) => {
  try {
    const response = await axios.post(BASE_URL, collectionData);
    return response.data;
  } catch (error) {
    console.error("Error creating collection:", error.response || error);
    throw error;
  }
};

/**
 * Update collection
 * PUT /api/collections/{id}
 */
export const updateCollection = async (id, collectionData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, collectionData);
    return response.data;
  } catch (error) {
    console.error("Error updating collection:", error.response || error);
    throw error;
  }
};

/**
 * Delete collection
 * DELETE /api/collections/{id}
 */
export const deleteCollection = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting collection:", error.response || error);
    throw error;
  }
};