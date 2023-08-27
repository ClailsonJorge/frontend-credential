export type TypeCredential = "EMAIL" | "CREDIT_CARD";


interface CommonPropsCredential {
    id: string;
    title: string;
    type: TypeCredential;
    password: string;    
    createdAt: Date;
    updatedAt: Date;
}

export type CredentialEmail = CommonPropsCredential & {
    site: string;
    email: string;
}

export type CredentialCreditCard = CommonPropsCredential & {
    name: string;
    numberCard: string;
    code: string;
    expirationDate: string;
}

export type CredentialCreateEmail = Omit<CredentialEmail, "id" | "createdAt" | "updatedAt">;
export type CredentialCreateCC = Omit<CredentialCreditCard, "id" | "createdAt" | "updatedAt">;
