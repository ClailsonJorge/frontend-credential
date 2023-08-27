import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputGroup, Label, Input, ErrorMessage, Form } from './style';
import { CredentialCreateEmail } from '../../types/cards';

type DataForm = Omit<CredentialCreateEmail, "type">

type Props = {
    onSubmit: (data: DataForm) => void
}
export const EmailForm: React.FC<Props> = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    site: yup.string().required('O campo Site é obrigatório para Email.'),
    email: yup.string().email('Insira um email válido.').required('O campo Email é obrigatório para Email.'),
    password: yup.string().required('O campo Password é obrigatório.'),
    title: yup.string().required('O campo Title é obrigatório.'),
  });

  const { handleSubmit, control, formState: { errors } } = useForm<DataForm>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Label>Site</Label>
        <Controller
          name="site"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.site && <ErrorMessage>{errors.site.message}</ErrorMessage>}
      </InputGroup>
      <InputGroup>
        <Label>Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
      <button type="submit">Cadastrar</button>
    </Form>
  );
};
