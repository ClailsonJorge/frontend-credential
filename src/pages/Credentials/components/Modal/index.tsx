import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ModalContent, ModalWrapper } from './styles';

export const Modal = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <p>Usuário cadastrado</p>
        <Button onClick={handleRedirect}>Ok</Button>
      </ModalContent>
    </ModalWrapper>
  );
};
