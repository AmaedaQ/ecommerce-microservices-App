import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // For navigation

// Styled Components
const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const CartTable = styled.table`
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
`;

const CartTableHeader = styled.th`
  padding: 12px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
`;

const CartTableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e60000;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
`;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const [isCartCleared, setIsCartCleared] = useState(false);
  const navigate = useNavigate(); // For navigation to home page

  useEffect(() => {
    // Fetch ordered product IDs from local storage
    const orderedProductIds = JSON.parse(localStorage.getItem("orders")) || [];

    // Fetch product details for each product ID
    const fetchProductDetails = async () => {
      try {
        const fetchedProducts = [];
        for (const productId of orderedProductIds) {
          const response = await axios.get(
            `http://localhost:5000/products/${productId}`
          );
          fetchedProducts.push(response.data);
        }
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, []);

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      updatedQuantities[productId] =
        (updatedQuantities[productId] || 1) + change;
      // Ensure quantity doesn't go below 1
      if (updatedQuantities[productId] < 1) updatedQuantities[productId] = 1;
      return updatedQuantities;
    });
  };

  const handleRemoveItem = (productId) => {
    // Remove the product from the list
    const updatedProducts = products.filter(
      (product) => product._id !== productId
    );
    setProducts(updatedProducts);

    // Update quantities
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[productId];
    setQuantities(updatedQuantities);

    // Update localStorage
    const orderedProductIds = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrderedProductIds = orderedProductIds.filter(
      (id) => id !== productId
    );
    localStorage.setItem("orders", JSON.stringify(updatedOrderedProductIds));

    // Recalculate total price
    calculateTotal(updatedProducts, updatedQuantities);
  };

  const calculateTotal = (updatedProducts, updatedQuantities) => {
    const newTotal = updatedProducts.reduce((total, product) => {
      const quantity = updatedQuantities[product._id] || 1;
      return total + product.price * quantity;
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    // Calculate the total price whenever quantities change
    calculateTotal(products, quantities);
  }, [quantities, products]);

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
    // Optionally, you could also handle backend order creation here
    // After order is confirmed, clear the cart or perform other actions
  };

  const handleClearCart = () => {
    setIsCartCleared(true);
    localStorage.removeItem("orders"); // Clear cart from local storage
  };

  const handleGoBackHome = () => {
    // Close the dialog by updating the modal state
    setIsOrderConfirmed(false);
    setIsCartCleared(false);
    // Navigate back to the home page
    navigate("/");
  };

  return (
    <Container>
      <CartTitle>Your Shopping Cart</CartTitle>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <CartTable>
            <thead>
              <tr>
                <CartTableHeader>Product</CartTableHeader>
                <CartTableHeader>Price</CartTableHeader>
                <CartTableHeader>Quantity</CartTableHeader>
                <CartTableHeader>Total</CartTableHeader>
                <CartTableHeader>Action</CartTableHeader>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const quantity = quantities[product._id] || 1;
                const totalPrice = product.price * quantity;
                return (
                  <tr key={product._id}>
                    <CartTableCell>{product.name}</CartTableCell>
                    <CartTableCell>${product.price}</CartTableCell>
                    <CartTableCell>
                      <Button
                        onClick={() => handleQuantityChange(product._id, -1)}
                      >
                        -
                      </Button>
                      {quantity}
                      <Button
                        onClick={() => handleQuantityChange(product._id, 1)}
                      >
                        +
                      </Button>
                    </CartTableCell>
                    <CartTableCell>${totalPrice}</CartTableCell>
                    <CartTableCell>
                      <RemoveButton
                        onClick={() => handleRemoveItem(product._id)}
                      >
                        Remove
                      </RemoveButton>
                    </CartTableCell>
                  </tr>
                );
              })}
            </tbody>
          </CartTable>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Button onClick={handleConfirmOrder}>Confirm Order</Button>
        </div>
      )}

      {/* Order Confirmation Modal */}
      <ModalOverlay show={isOrderConfirmed}>
        <ModalContent>
          <h2>Your order will be confirmed soon!</h2>
          <Button onClick={handleClearCart}>OK</Button>
        </ModalContent>
      </ModalOverlay>

      {/* Cart Cleared Modal */}
      <ModalOverlay show={isCartCleared}>
        <ModalContent>
          <h2>Your cart has been cleared!</h2>
          <Button onClick={handleGoBackHome}>Go Back to Home</Button>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default Cart;
