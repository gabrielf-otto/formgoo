import handlebars from 'handlebars';
import fs from 'fs';

import ITemplateMailProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseTemplateMailDTO';


class HandlebarsMailTemplateProvider implements ITemplateMailProvider {
   async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> 
   {
      const content = await fs.promises.readFile(file, {
         encoding: 'utf-8'
      });

      const parse = handlebars.compile(content);
      return parse(variables);
   }
}


export default HandlebarsMailTemplateProvider;
