import React, { useState } from 'react';
import { BsPencilSquare, BsTrash, BsEye, BsEyeSlash } from 'react-icons/bs';
import { CardContainer, CardHeader, CardTitle, CardButtons, CardBody, PasswordValue } from './styles';


interface CardProps {
    title: string;
    password: string;
    site?: string;
    email?: string;
    name?: string;
    cardNumber?: string;
    code?: string;
    expirantionDate?: Date;
}

const helperString = (string: string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
}


export const CredentialCard: React.FC<CardProps> = ({ title, password, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CardContainer>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardButtons>
          <button>
            <BsPencilSquare />
          </button>
          <button>
            <BsTrash />
          </button>
        </CardButtons>
      </CardHeader>
      <CardBody>
        {Object.keys(rest).map((key) => {
            return (
            <p key={key}>
              {`${helperString(key)}: ${rest[key as keyof typeof rest]}`}
            </p>
          )}
        )}
        <p>
          Password: {showPassword ? <PasswordValue>{password}</PasswordValue> : '*****'}
          <button onClick={togglePasswordVisibility}>
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </button>
        </p>
      </CardBody>
    </CardContainer>
  );
};

