import React, { useState } from 'react';
import { PageWrapper, LogoutButton, Main, CardList, Header } from './styles';
import { logout } from '../../../../utils/logout';
import { useNavigate } from 'react-router-dom';
import { CredentialCard } from '../CredentialCard';
import { useCredentials } from '../../hooks/credentials';
import CredentialModal from '../ModalCreate';

export const Layout = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  
  const { credentialsCC, credentialsEmail, error, fecthCreateCredential, loading, user } = useCredentials();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <PageWrapper>
      <Header>
        <h1>Bem vindo, {user.name}!</h1>
        <div>
          <LogoutButton onClick={openModal}>Cadastrar Credential</LogoutButton> |
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Header>
      <Main>
        <CardList>
          <h2>Emails</h2>
          {credentialsEmail.map((card) => (
            <CredentialCard key={card.id} {...card} />
          ))}
          <h2>Credit Card</h2>
          {credentialsCC.map((card) => (
            <CredentialCard key={card.id + "cc"} {...card}/>
          ))}
        </CardList>
      </Main>
      {modalOpen && <CredentialModal onClose={closeModal} fetchCreateCredential={fecthCreateCredential} loading={loading}/>}
    </PageWrapper>
  );
}

