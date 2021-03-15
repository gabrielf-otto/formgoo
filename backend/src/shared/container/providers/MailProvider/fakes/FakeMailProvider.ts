import IMailDTO from '../dtos/IMailDTO';
import IMailProvider from '../models/IMailProvider';


interface IMessage {
   message: string;
}

class FakeMailProvider implements IMailProvider {
   private messages: string[] = [];

   async sendMail({ to, from, subject, template }: IMailDTO): Promise<void> {
      console.log('E-mail has been send');
   }
}


export default FakeMailProvider;
