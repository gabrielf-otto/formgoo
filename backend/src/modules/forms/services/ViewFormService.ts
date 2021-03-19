import { injectable, inject } from 'tsyringe';

import IFormRepository from '../repositories/IFormRepository';
import Form from '../infra/typeorm/entities/Form';


interface IRequest {
   form_id: string;
}

@injectable()
class ViewFormService
{
   constructor(
      @inject('FormRepository')
      private formRepository: IFormRepository
   )
   {}

   async run({ form_id }: IRequest): Promise<Form | undefined> 
   {
      return await this.formRepository.findById(form_id);
   }
}


export default ViewFormService;
