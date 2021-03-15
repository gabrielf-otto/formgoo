import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseTemplateMailDTO';


interface IMailContact {
   name: string;
   email: string;
}

export default interface IMailDTO {
   to: IMailContact,
   from?: IMailContact,
   subject: string;
   template: IParseMailTemplateDTO
}
