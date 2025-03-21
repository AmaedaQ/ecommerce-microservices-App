import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

// import styled from 'styled-components';

const Container = styled.div`
  padding: 40px 20px;
  text-align: center;
  background-color: #fafafa;
  min-height: 100vh;
  font-family: "Roboto", sans-serif; // Clean, modern font
`;

const WelcomeMessage = styled.h1`
  font-size: 2.8rem;
  color: #222;
  font-family: "Poppins", sans-serif; // Elegant font for the heading
  margin-bottom: 30px;
  letter-spacing: 1px; // More space between letters for a refined look
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 40px;
`;

const ProductCard = styled.div`
  width: 250px;
  margin: 15px;
  padding: 25px;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease,
    background-color 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9; // Subtle background color change on hover
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600; // Makes the name stand out more
`;

const ProductPrice = styled.p`
  font-size: 1.4rem;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #777;
  margin-bottom: 15px;
  line-height: 1.4; // Improved line spacing for readability
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 15px;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px; // Spacing to add a more polished look
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ show }) => (show ? "block" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 35px;
  border-radius: 12px;
  width: 450px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.4s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 90%; // Ensures modal is not too tall
  overflow-y: auto; // Allows scrolling if content overflows

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1.1rem;
  margin-top: 8px;
  background-color: #f9f9f9;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 500;
`;

const BackButton = styled(Button)`
  background-color: #28a745;
  margin-top: 30px;

  &:hover {
    background-color: #218838;
  }
`;

const ModalButton = styled(Button)`
  width: 100%; // Make button full width inside modal
  margin-top: 20px;
`;

const ModalCloseButton = styled(Button)`
  background-color: #dc3545;
  margin-top: 15px;
  &:hover {
    background-color: #c82333;
  }
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState({
    _id: "",
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
  });

  const placeholderImage = "https://via.placeholder.com/200";

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching products");
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewProduct({
      name: "",
      price: "",
      stock: "",
      description: "",
      category: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/products", newProduct) // Send data to API Gateway
      .then((response) => {
        setProducts([...products, response.data]);
        handleCloseModal();
      })
      .catch((err) => {
        setError("Error adding product");
      });
  };

  const handleDelete = (_id) => {
    if (!_id) {
      console.error("Product ID is missing");
      return;
    }

    axios
      .delete(`http://localhost:5000/products/${_id}`)
      .then((response) => {
        setProducts(products.filter((product) => product._id !== _id));
      })
      .catch((err) => {
        setError("Error deleting product");
      });
  };

  const handleUpdate = (_id) => {
    const productToUpdate = products.find((product) => product._id === _id);
    setUpdateProduct({ ...productToUpdate });
    setShowModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/products/${updateProduct._id}`, updateProduct)
      .then((response) => {
        const updatedProducts = products.map((product) =>
          product._id === updateProduct._id ? response.data : product
        );
        setProducts(updatedProducts);
        handleCloseModal();
      })
      .catch((err) => {
        setError("Error updating product");
      });
  };

  const handleOrder = (productId) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(productId);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert(`Product with ID: ${productId} has been added to your orders.`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <WelcomeMessage>Welcome to Our E-Commerce Store</WelcomeMessage>
      <Button onClick={handleAddProduct}>Add New Product</Button>

      <ProductList>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <ProductImage src={placeholderImage} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>${product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <Button onClick={() => handleDelete(product._id)}>Delete</Button>
            <Button
              onClick={() => handleUpdate(product._id)}
              style={{ marginTop: "10px" }}
            >
              Update
            </Button>
            <Button
              onClick={() => handleOrder(product._id)}
              style={{ marginTop: "10px" }}
            >
              Order
            </Button>
          </ProductCard>
        ))}
      </ProductList>

      <Modal show={showModal}>
        <ModalContent>
          <h2>{updateProduct._id ? "Update Product" : "Add New Product"}</h2>
          <form
            onSubmit={updateProduct._id ? handleUpdateSubmit : handleSubmit}
          >
            <FormField>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={updateProduct._id ? updateProduct.name : newProduct.name}
                onChange={
                  updateProduct._id
                    ? handleUpdateInputChange
                    : handleInputChange
                }
                required
              />
            </FormField>
            <FormField>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={
                  updateProduct._id ? updateProduct.price : newProduct.price
                }
                onChange={
                  updateProduct._id
                    ? handleUpdateInputChange
                    : handleInputChange
                }
                required
              />
            </FormField>
            <FormField>
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                value={
                  updateProduct._id ? updateProduct.stock : newProduct.stock
                }
                onChange={
                  updateProduct._id
                    ? handleUpdateInputChange
                    : handleInputChange
                }
                required
              />
            </FormField>
            <FormField>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={
                  updateProduct._id
                    ? updateProduct.description
                    : newProduct.description
                }
                onChange={
                  updateProduct._id
                    ? handleUpdateInputChange
                    : handleInputChange
                }
                required
              />
            </FormField>
            <FormField>
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                value={
                  updateProduct._id
                    ? updateProduct.category
                    : newProduct.category
                }
                onChange={
                  updateProduct._id
                    ? handleUpdateInputChange
                    : handleInputChange
                }
                required
              />
            </FormField>
            <Button type="submit">
              {updateProduct._id ? "Update Product" : "Add Product"}
            </Button>
          </form>
          <Button onClick={handleCloseModal} style={{ marginTop: "10px" }}>
            Close
          </Button>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default HomePage;
