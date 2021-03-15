import IMailDTO from '../dtos/IMailDTO';


export default interface IMailProvider {
   sendMail(data: IMailDTO): Promise<void>;
}
