import axios from "axios";

// Base URL for your Spring Boot backend
const DOMAIN_NAME = "http://localhost:8080";
const BASE_URL = `${DOMAIN_NAME}/api/orders`;

// Add axios interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('Response received from backend');
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error);
    return Promise.reject(error);
  }
);

/**
 * Transform backend order data to frontend format
 * IMPORTANT: Handles circular references by breaking the order->items->order chain
 */
const transformOrderData = (order) => {
  // Break circular reference by not including the nested order in items
  const cleanItems = order.items?.map(item => ({
    id: item.id,
    quantity: item.quantity,
    price: item.price,
    // Create product object from item data
    product: {
      nom: item.productName || 'منتج',
      newPrice: item.price,
      image: item.productImage || null
    }
  })) || [];

  return {
    id: order.id,
    reference: order.reference,
    clientFullName: order.clientFullName,
    clientPhone: order.clientPhone,
    clientAddress: order.clientAddress,
    totalPrice: order.totalPrice,
    status: order.status,
    createdAt: order.createdAt,
    // Map 'items' to 'orderItems' for frontend compatibility
    orderItems: cleanItems
  };
};

/**
 * Get all orders
 * GET /api/orders
 */
export const fetchOrders = async () => {
  try {
    console.log('Fetching orders from:', BASE_URL);
    const response = await axios.get(BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    console.log('Raw response data received');
    const data = response.data;
    
    // Check if data is valid
    if (!data) {
      console.error('No data received from backend');
      return [];
    }

    // Transform the data to match frontend expectations and break circular references
    if (Array.isArray(data)) {
      console.log(`Transforming ${data.length} orders`);
      const transformedOrders = data.map(order => transformOrderData(order));
      console.log('Orders transformed successfully:', transformedOrders);
      return transformedOrders;
    }
    
    console.warn('Data is not an array:', typeof data);
    return [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error - Backend may not be running on localhost:8080');
      alert('خطأ في الاتصال: تأكد من تشغيل الخادم على http://localhost:8080');
    } else if (error.response) {
      console.error('Server responded with error:', error.response.status, error.response.data);
      alert(`خطأ من الخادم: ${error.response.status}`);
    } else if (error.message) {
      console.error('Error message:', error.message);
    }
    
    return [];
  }
};

/**
 * Create new order
 * POST /api/orders
 */
export const createOrder = async (orderData) => {
  try {
    console.log('Creating order:', orderData);
    const response = await axios.post(BASE_URL, orderData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Order created successfully');
    return transformOrderData(response.data);
  } catch (error) {
    console.error("Error creating order:", error.response || error);
    throw error;
  }
};

/**
 * Update order status
 * PUT /api/orders/{id}/status
 */
export const updateOrderStatus = async (id, status) => {
  try {
    console.log(`Updating order ${id} to status ${status}`);
    const response = await axios.put(`${BASE_URL}/${id}/status`, null, {
      params: { status },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Order status updated successfully');
    return transformOrderData(response.data);
  } catch (error) {
    console.error("Error updating order status:", error.response || error);
    throw error;
  }
};

/**
 * Delete order
 * DELETE /api/orders/{id}
 */
export const deleteOrder = async (id) => {
  try {
    console.log(`Deleting order ${id}`);
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Order deleted successfully');
    return true;
  } catch (error) {
    console.error("Error deleting order:", error.response || error);
    throw error;
  }
};

/**
 * Order status constants
 */
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  NO_RESPONSE: 'NO_RESPONSE',
  DELIVERED: 'DELIVERED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY'
};