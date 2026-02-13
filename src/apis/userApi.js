import axios from "axios";

// Base URL for your Spring Boot backend
const DOMAIN_NAME = "http://localhost:8080";
const BASE_URL = `${DOMAIN_NAME}/api/users`;

// Endpoint URLs
const FETCH_EMPLOYEES_URL = `${BASE_URL}/employees`;
const ADD_USER_URL = `${BASE_URL}`; // POST to /api/users
const UPDATE_USER_URL = (id) => `${BASE_URL}/${id}`; // PUT to /api/users/{id}
const DELETE_USER_URL = (id) => `${BASE_URL}/${id}`; // DELETE to /api/users/{id}

/**
 * Fetch all employees
 * GET /api/users/employees
 */
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(FETCH_EMPLOYEES_URL);
    return response.data; // Array of employees
  } catch (error) {
    console.error("Error fetching employees:", error.response || error);
    throw error;
  }
};

/**
 * Add a new employee
 * POST /api/users
 * @param {Object} employeeData - Example:
 * {
 *   email: "employee@example.com",
 *   password: "123456",
 *   nom: "Mohamed",
 *   prenom: "Boukouch",
 *   role: "EMPLOYEE"
 * }
 */
export const addEmployee = async (employeeData) => {
  try {
    // POST to /api/users (not /api/users/employees)
    const response = await axios.post(ADD_USER_URL, employeeData);
    return response.data; // Added employee object
  } catch (error) {
    console.error("Error adding employee:", error.response || error);
    throw error;
  }
};

/**
 * Update an existing employee
 * PUT /api/users/{id}
 */
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(UPDATE_USER_URL(id), employeeData);
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error.response || error);
    throw error;
  }
};

/**
 * Delete an employee
 * DELETE /api/users/{id}
 */
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete(DELETE_USER_URL(id));
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error.response || error);
    throw error;
  }
};

/**
 * Login
 * POST /api/users/login
 */
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, null, {
      params: { email, password }
    });
    return response.data; // Token or user info
  } catch (error) {
    console.error("Error logging in:", error.response || error);
    throw error;
  }
};

/**
 * Fetch all supervisors
 * GET /api/users/supervisors
 */
export const fetchSupervisors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/supervisors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching supervisors:", error.response || error);
    throw error;
  }
};

/**
 * Find user by email
 * GET /api/users/find?email=xxx
 */
export const findUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/find`, {
      params: { email }
    });
    return response.data;
  } catch (error) {
    console.error("Error finding user by email:", error.response || error);
    throw error;
  }
};