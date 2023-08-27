import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputGroup, Label, Input, ErrorMessage, Form } from './styles';
import { CredentialCreateCC } from '../../types/cards';

export interface Props {
    onSubmit: (data: DataForm) => void
}

type DataForm = Omit<CredentialCreateCC, "type">

export const CreditCardForm: React.FC<Props> = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('O campo Name é obrigatório para Cartão de Crédito.'),
    code: yup.string().required('O campo Code é obrigatório para Cartão de Crédito.'),
    title: yup.string().required('O campo Title é obrigatório.'),
    password: yup.string().required('O campo Password é obrigatório.'),
    expirationDate: yup.string().required('O campo Data de Expiração é obrigatório para Cartão de Crédito.'),
    numberCard: yup.string().required('O campo Número do Cartão é obrigatório para Cartão de Crédito.'),
  });

  const { handleSubmit, control, formState: { errors } } = useForm<DataForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label>Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Code</Label>
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Title</Label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input type="password" {...field} />
          )}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Expiration Date</Label>
        <Controller
          name="expirationDate"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.expirationDate && <ErrorMessage>{errors.expirationDate.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Number Card</Label>
        <Controller
          name="numberCard"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.numberCard && <ErrorMessage>{errors.numberCard.message}</ErrorMessage>}
      </InputGroup>
      <button type="submit">Cadastrar</button>
    </Form>
  );
};
