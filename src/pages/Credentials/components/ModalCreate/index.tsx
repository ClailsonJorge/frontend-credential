import React, { useState } from 'react';
import { ModalOverlay, ModalContent, TabButtons, TabButton, Form } from './styles';
import { EmailForm } from '../EmailForm';
import { CreditCardForm } from '../CreditCardForm';
import { CredentialCreateCC, CredentialCreateEmail, TypeCredential } from '../../types/cards';
import { BsDoorClosed } from 'react-icons/bs';

interface Props {
    onClose: () => void;
    fetchCreateCredential: (data: CredentialCreateEmail | CredentialCreateCC) => Promise<void>;
    loading: boolean;
}

type DataSubmit = Omit<CredentialCreateCC, "type"> | Omit<CredentialCreateEmail, "type">

const CredentialModal: React.FC<Props> = ({ onClose, fetchCreateCredential }) => {
    const [tab, setTab] = useState<TypeCredential>("EMAIL");

    const handleTab = (tab: TypeCredential) => {
        setTab(tab);
    }

  const onSubmit = async (data: DataSubmit) => {
    await fetchCreateCredential({...data, type: tab });
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <div onClick={onClose}>
            <BsDoorClosed />
        </div>
        <TabButtons>
          <TabButton onClick={() => handleTab('EMAIL')} active={tab === 'EMAIL'}>
            Email
          </TabButton>
          <TabButton onClick={() => handleTab('CREDIT_CARD')} active={tab === 'CREDIT_CARD'}>
            Credit Card
          </TabButton>
        </TabButtons>
        <Form>
          {tab === "EMAIL" ? (
            <EmailForm onSubmit={onSubmit}/>
          ) : <CreditCardForm onSubmit={onSubmit}/>}
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CredentialModal;
