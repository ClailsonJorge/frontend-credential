import styled from 'styled-components';

export const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardTitle = styled.h3`
  margin: 0;
`;

export const CardButtons = styled.div`
  display: flex;
  gap: 10px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const CardBody = styled.div`
  margin-top: 10px;
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export const PasswordValue = styled.span`
  font-family: monospace;
`;

