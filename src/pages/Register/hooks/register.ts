import React, { useCallback, useState } from 'react';
import { httpClient } from '../../../config/httpClient';
import Cookies from 'js-cookie';
import { ReportError, reportError } from '../../../utils/reportError';
import { logout } from '../../../utils/logout';



export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [registed, setRegisted] = useState(false);
    const [error, setError] = useState("");
    
    const fecthRegister = useCallback(async (name: string, email: string, password: string): Promise<void> => {
        logout();
        setLoading(true);
        setRegisted(false);
        setError("");
        try {
            const response = await httpClient.post("/user", { name, email, password });
            const user = response.data;
            if(!user) throw new Error("Erro ao efetuar o cadastro.")
            Cookies.set("user", JSON.stringify(user));
            setLoading(false);
            setRegisted(true);
            setError("");
        } catch (error) {
            setLoading(false);
            setRegisted(false);
            setError(reportError(error as ReportError));
        }
    }, []);

    return { fecthRegister, loading, error, registed }
}