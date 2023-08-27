import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Label, Input, ErrorMessage, Button, Form, LoadingIcon } from './styles';
import { useLogin } from '../../hooks/login';

type FormDataFields = {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  password: yup.string().required('Senha é obrigatória'),
});

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { fecthLogin, error, loading, logged } = useLogin();
  const { register, handleSubmit,formState: { errors } } = useForm<FormDataFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormDataFields) => {
      await fecthLogin(data.email, data.password);
  };

  useEffect(() => {
    if(logged) {
      navigate("/credentials")
    }
  }, [logged, navigate])

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Email</Label>
        <Input type="text" {...register('email')} disabled={loading} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        
        <Label>Senha</Label>
        <Input type="password" disabled={loading} {...register('password')} />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        
        <Button type="submit" disabled={loading}>{loading && <LoadingIcon />}{loading ? "Carregando..." : "Login"}</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
    </Container>
  );
};

