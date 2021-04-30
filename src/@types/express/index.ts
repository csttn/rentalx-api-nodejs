// Sobrescrevendo types do express informando que o user possui um atributi id do tipo string
// esta so0brescrita afetara diretamento o arquivo ensureAuthenticated.ts (middlewares)
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
