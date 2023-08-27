import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

export const TabButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

type TabButtonProps = {
    active: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;