const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus, // Include status update functions
  updatePaymentStatus,
  updateDeliveryStatus,
} = require('../service/orderService'); // Import the service functions

// Middleware for handling errors
const errorHandler = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ message });
};

// Fetch all orders
router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    errorHandler(res, error, 'Failed to fetch orders');
  }
});

// Fetch a single order by ID
router.get('/admin/orders/:orderId/edit', async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await getOrderById(orderId);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    errorHandler(res, error, 'Failed to fetch order');
  }
});

// Update an order (address, phone, shipping, cart)
router.put('/admin/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { address, phone, shippingCharge, cart } = req.body;

  const updateData = {
    ...(address && { address }),
    ...(phone && { phone }),
    ...(shippingCharge && { shippingCharge }),
    ...(cart && { cart }),
  };

  try {
    const result = await updateOrder(orderId, updateData);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Order updated successfully' });
    } else if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(304).json({ message: 'No changes were made' });
    }
  } catch (error) {
    errorHandler(res, error, 'Failed to update order');
  }
});

// **New API for updating Payment Status**
router.put('/admin/orders/:orderId/payment-status', async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;

  try {
    const result = await updatePaymentStatus(orderId, paymentStatus);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Payment status updated successfully' });
    } else if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(304).json({ message: 'No changes were made' });
    }
  } catch (error) {
    errorHandler(res, error, 'Failed to update payment status');
  }
});

// **New API for updating Delivery Status**
router.put('/admin/orders/:orderId/delivery-status', async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus } = req.body;

  try {
    const result = await updateDeliveryStatus(orderId, deliveryStatus);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Delivery status updated successfully' });
    } else if (result.matchedCount === 0) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.status(304).json({ message: 'No changes were made' });
    }
  } catch (error) {
    errorHandler(res, error, 'Failed to update delivery status');
  }
});

// Delete an order
router.delete('/admin/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await deleteOrder(orderId);

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    errorHandler(res, error, 'Failed to delete order');
  }
});

module.exports = router;
