import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void>;
}

export { IMailProvider };
