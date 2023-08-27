import React, { useCallback, useState } from 'react';
import { httpClient } from '../../../config/httpClient';
import Cookies from 'js-cookie';

type ErrorWithMessage = {
    message: string;
}

type ErrorWithResponse = {
    response: {
        data: ErrorWithMessage
    };
}

type ReportError = ErrorWithMessage & ErrorWithResponse;

const reportError = (error: ReportError) => {
    console.log(error)
    if(error?.response?.data?.message) return error.response.data.message
    if(!error?.message) return "Erro ao efetuar o login";
    return error.message;
}

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);
    const [error, setError] = useState("");
    
    const fecthLogin = useCallback(async (email: string, password: string): Promise<void> => {
        setLoading(true);
        setLogged(false);
        setError("");
        try {
            const response = await httpClient.post("/login", { email, password });
            const { token } = response.data;
            if(!token) throw new Error("Erro ao efetuar o login")
            Cookies.set("token", token);
            setLoading(false);
            setLogged(true);
            setError("");
        } catch (error) {
            setLoading(false);
            setLogged(false);
            setError(reportError(error as ReportError));
        }
    }, []);

    return { fecthLogin, loading, error, logged }
}