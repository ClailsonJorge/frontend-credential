import * as yup from 'yup';

interface EmailFields {
    site: string;
    email: string;
    password: string;
    title: string;
}

interface CreditCardFields {
    name: string;
    code: string;
    title: string;
    password: string;
    expirationDate: string;
    numberCard: string;
}

export const validationSchemaEmail = yup.object<EmailFields>({
    site: yup.string().required('O campo Site é obrigatório para Email.'),
    email: yup.string().email('Insira um email válido.').required('O campo Email é obrigatório para Email.'),
    password: yup.string().required('O campo Password é obrigatório.'),
    title: yup.string().required('O campo Title é obrigatório.'),
})

export const validationSchemaCC = yup.object<CreditCardFields>({
    name: yup.string().required('O campo Name é obrigatório para Cartão de Crédito.'),
    code: yup.string().required('O campo Code é obrigatório para Cartão de Crédito.'),
    title: yup.string().required('O campo Title é obrigatório.'),
    password: yup.string().required('O campo Password é obrigatório.'),
    expirationDate: yup.string().required('O campo Data de Expiração é obrigatório para Cartão de Crédito.'),
    numberCard: yup.string().required('O campo Número do Cartão é obrigatório para Cartão de Crédito.'),
})
