import React, { useCallback, useEffect, useState } from 'react';
import { httpClient } from '../../../config/httpClient';
import Cookies from 'js-cookie';
import { ReportError, reportError } from '../../../utils/reportError';
import { CredentialEmail, CredentialCreditCard, CredentialCreateEmail, CredentialCreateCC } from '../types/cards';
import { useNavigate } from 'react-router-dom';

type Credentials = CredentialEmail | CredentialCreditCard;
type User = {
    name: string;
}
const separeCredentials = (credentials: Credentials[], type: Credentials["type"]): CredentialEmail[] | CredentialCreditCard[] => {
    const credentialsFiltered = credentials.filter(credential => credential.type === type);
    return credentialsFiltered as CredentialEmail[] | CredentialCreditCard[];
}

export const useCredentials = () => {
    const navigate = useNavigate();
    const userCookie = Cookies.get("user");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>(() => !!userCookie ? JSON.parse(userCookie) : {});
    const [credentialsEmail, setCredentialsEmail] = useState([] as CredentialEmail[]);
    const [credentialsCC, setCredentialsCC] = useState([] as CredentialCreditCard[]);
    const [error, setError] = useState("");
    const token = Cookies.get("token");
console.log(JSON.parse("{}"))
    const fecthGetCredentials = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError("");
        try {
            const response = await httpClient.get("/credentials");
            const credentialsGot = response.data as Credentials[];
            if(!credentialsGot) throw new Error("Erro ao efetuar o cadastro.");
            setLoading(false);
            setCredentialsEmail(() => separeCredentials(credentialsGot, "EMAIL") as CredentialEmail[]);
            setCredentialsCC(() => separeCredentials(credentialsGot, "CREDIT_CARD") as CredentialCreditCard[]);
            setError("");
        } catch (error) {
            setLoading(false);
            setCredentialsEmail([]);
            setCredentialsCC([]);
            setError(reportError(error as ReportError));
        }
    }, []);

    const fecthCreateCredential = useCallback(async (data: CredentialCreateEmail | CredentialCreateCC): Promise<void> => {
        setLoading(true);
        setError("");
        try {
            const response = await httpClient.post("/credentials", { credential: data });
            const credentialCreated = response.data;
            if(!credentialCreated) throw new Error("Erro ao efetuar o cadastro.");
            
            credentialCreated.type === "EMAIL" ? setCredentialsEmail((state) => [...state, credentialCreated as CredentialEmail])
            : setCredentialsCC((state) => [...state, credentialCreated as CredentialCreditCard]); 
            
            setLoading(false);
            setError("");
        } catch (error) {
            setLoading(false);
            setError(reportError(error as ReportError));
        }
    }, []);

    const fecthUserByToken = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError("");
        try {
            const response = await httpClient.get("/user");
            const user = response.data;
            if(!user) throw new Error("Usuário não encontrado.");
            
            setUser(user)
            setLoading(false);
            setError("");
        } catch (error) {
            setLoading(false);
            setError(reportError(error as ReportError));
        }
    }, []);

    useEffect(() => {
        if(token) {
            fecthGetCredentials();
        } else {
            navigate("/");
        }
    },[fecthGetCredentials, navigate, token]);

    useEffect(() => {
        if(token && !user) {
            fecthUserByToken();
        }
    },[fecthUserByToken, token, user]);

    

    return { fecthGetCredentials, fecthCreateCredential, loading, error, credentialsEmail, credentialsCC, user }
}