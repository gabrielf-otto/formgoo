import ITemplateMailProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';


class FakeMailTemplateProvider implements ITemplateMailProvider {
   async parse(): Promise<string> {
      return '';
   }
}


export default FakeMailTemplateProvider;
