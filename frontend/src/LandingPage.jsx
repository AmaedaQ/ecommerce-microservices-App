import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
`;

const Header = styled.header`
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Nav = styled.nav`
  margin-top: 10px;
`;

const NavLinkList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavLink = styled.li`
  margin: 0 20px;
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  text-align: center;
  padding: 50px 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 40px;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLinkList = styled(Link)`
  font-size: 1.5rem;
  color: #007bff;
  text-decoration: none;
  margin: 10px 0;
  &:hover {
    text-decoration: underline;
  }
`;

const LandingPage = () => {
  return (
    <Container>
      {/* Header */}
      <Header>
        <HeaderTitle>Our E-Commerce Store</HeaderTitle>
        <Nav>
          <NavLinkList>
            <NavLink>
              <StyledLink to="/">Home</StyledLink>
            </NavLink>
            <NavLink>
              <StyledLink to="/products">Products</StyledLink>
            </NavLink>
            <NavLink>
              <StyledLink to="/orders">Orders</StyledLink>
            </NavLink>
            <NavLink>
              <StyledLink to="/login">Login</StyledLink>
            </NavLink>
          </NavLinkList>
        </Nav>
      </Header>

      {/* Main Content */}
      <MainContent>
        <Title>Welcome to Our E-Commerce Store</Title>
        <Description>
          Discover a wide range of products at your fingertips. Start shopping
          today!
        </Description>
        <LinkList>
          <StyledLinkList to="/">Go to Home Page</StyledLinkList>
          <StyledLinkList to="/products">Explore Products</StyledLinkList>
          <StyledLinkList to="/orders">View Orders</StyledLinkList>
          <StyledLinkList to="/login">Login</StyledLinkList>
        </LinkList>
      </MainContent>
    </Container>
  );
};

export default LandingPage;
