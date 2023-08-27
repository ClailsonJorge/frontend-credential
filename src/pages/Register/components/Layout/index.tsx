import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Label, Input, ErrorMessage, Button, Form, LoadingIcon } from './styles';
import { useRegister } from '../../hooks/register';
import { Modal } from '../Modal';

type FormDataFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().required('Email é obrigatório').email('Email inválido'),
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'As senhas não coincidem')
});

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { fecthRegister, error, loading, registed } = useRegister();
  const { register, handleSubmit,formState: { errors } } = useForm<FormDataFields>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormDataFields) => {
      await fecthRegister(data.name, data.email, data.password);
  };

  useEffect(() => {
    if(registed) {
      setShowModal(true);
    }
  }, [registed, navigate])

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        <Input type="text" {...register('name')} disabled={loading} />
        <ErrorMessage>{errors.name?.message}</ErrorMessage>

        <Label>Email</Label>
        <Input type="text" {...register('email')} disabled={loading} />
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        
        <Label>Senha</Label>
        <Input type="password" disabled={loading} {...register('password')} />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <Label>Confirme senha</Label>
        <Input type="password" disabled={loading} {...register('confirmPassword')} />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        
        <Button type="submit" disabled={loading}>{loading && <LoadingIcon />}{loading ? "Carregando..." : "Cadastrar"}</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
      
      <Link to="/">Voltar para Login</Link>
      {showModal && <Modal />}
    </Container>
  );
};

