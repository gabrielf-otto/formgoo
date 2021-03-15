import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailDTO from '../dtos/IMailDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';


@injectable()
class EtherealMailProvider implements IMailProvider {
   private client: Transporter;

   constructor(
      @inject('MailTemplateProvider')
      private mailTemplateProvider: IMailTemplateProvider
   ) 
   {
      nodemailer.createTestAccount().then(account => {
         const transporter = nodemailer.createTransport(
         {
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: 
            {
               user: account.user,
               pass: account.pass
            }
         });
      
         this.client = transporter;
      });
   }

   async sendMail({ to, from, subject, template }: IMailDTO): Promise<void> 
   {
      const info = await this.client.sendMail({
         to: {
            name: to.name,
            address: to.email
         },
         from: {
            name: from?.name || 'Formspy',
            address: from?.email || 'equipe@formspy.com'
         },
         subject,
         html: await this.mailTemplateProvider.parse(template)
      });

      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   }
}


export default EtherealMailProvider;
