import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Cart icon from react-icons
import HomePage from "./HomePage";
import Cart from "./Cart";
import styled from "styled-components";

const CartButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background-color: #0056b3;
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
  max-width: 500px;
  margin: 0 auto;
`;

const App = () => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => setShowCart((prev) => !prev);

  return (
    <div>
      {/* Cart Button - Positioned at top right */}
      <CartButton onClick={toggleCart}>
        <FaShoppingCart />
      </CartButton>

      {/* Home Page */}
      <HomePage />

      {/* Cart Modal */}
      <ModalOverlay show={showCart}>
        <ModalContent>
          <Cart />
          <button onClick={toggleCart}>Close Cart</button>
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export default App;
