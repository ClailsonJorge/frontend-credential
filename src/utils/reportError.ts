
type ErrorWithMessage = {
    message: string;
}

type ErrorWithResponse = {
    response: {
        data: ErrorWithMessage
    };
}

export type ReportError = ErrorWithMessage & ErrorWithResponse;

export const reportError = (error: ReportError) => {
    console.log(error)
    if(error?.response?.data?.message) return error.response.data.message
    if(!error?.message) return "Erro ao efetuar o login";
    return error.message;
}