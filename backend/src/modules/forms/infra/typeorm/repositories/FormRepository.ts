import { getRepository, Repository } from 'typeorm';

import Form from '../entities/Form';
import IFormRepository from '@modules/forms/repositories/IFormRepository';
import IStoreFormDTO from '@modules/forms/dtos/IStoreFormDTO';
import IMergeFormDTO from '@modules/forms/dtos/IMergeFormDTO';
import IFindMyFormDTO from '@modules/forms/dtos/IFindMyFormDTO';


class FormRepository implements IFormRepository {
   private repository: Repository<Form>;

   constructor() {
      this.repository = getRepository(Form);
   }

   async store({ title, description, questions, user_id }: IStoreFormDTO): Promise<Form> 
   {
      const form = await this.repository.create({
         title,
         description,
         questions,
         user_id
      });
      
      return await this.repository.save(form);
   }

   async merge(form: Form, { title, description, questions }: IMergeFormDTO): Promise<Form> 
   {
      return this.repository.merge(form, {
         title,
         description,
         questions
      });
   }

   async save(form: Form): Promise<Form> {
      return this.repository.save(form);
   }

   async findById(id: string): Promise<Form | undefined> {
      return await this.repository.findOne({ where: { id } });
   }

   async findMyForm({ form_id, user_id }: IFindMyFormDTO): Promise<Form | undefined> {
      return this.repository.findOne({ where: { id: form_id, user_id } });
   }

   async findAllMyForms(user_id: string): Promise<Form[]> {
      return await this.repository.find({ where: { user_id } });
   }

   async delete(form_id: string): Promise<void> {
      await this.repository.delete(form_id);
   }
}


export default FormRepository;
