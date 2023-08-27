import styled from 'styled-components';

export const PageWrapper = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
`;

export const Main = styled.main`
  margin-top: 20px;
`;

export const CardList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const Card = styled.li`
  background-color: #f4f4f4;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
`;