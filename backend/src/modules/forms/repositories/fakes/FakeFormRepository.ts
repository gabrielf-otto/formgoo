import { uuid } from 'uuidv4';

import Form from '@modules/forms/infra/typeorm/entities/Form';
import IStoreFormDTO from '@modules/forms/dtos/IStoreFormDTO';
import IMergeFormDTO from '@modules/forms/dtos/IMergeFormDTO';
import IFormRepository from '../IFormRepository';
import IFindMyFormDTO from '@modules/forms/dtos/IFindMyFormDTO';


class FakeFormRepository implements IFormRepository {
   private forms: Form[] = [];

   async store({ title, description, questions, user_id }: IStoreFormDTO): Promise<Form> {
      const form = new Form();

      Object.assign(form, {
         id: '1',
         title,
         description,
         questions,
         user_id
      });

      this.forms.push(form);
      return form;
   }

   async merge(form: Form, { title, description, questions }: IMergeFormDTO): Promise<Form> 
   {
      Object.assign(form, {
         title,
         description,
         questions
      });

      return form;
   }

   async save(form: Form): Promise<Form> 
   {
      const index = this.forms.findIndex(obj => obj.id === form.id);
      this.forms[index] = form;
      return form;
   }

   async findById(id: string): Promise<Form | undefined> {
      return this.forms.find(form => form.id === id);
   }

   async findMyForm({ form_id, user_id }: IFindMyFormDTO): Promise<Form | undefined> 
   {
      return this.forms.find(form => 
         form.id === form_id &&
         form.user_id === user_id   
      );
   }

   async findMyForms(user_id: string): Promise<Form[]> {
      return this.forms.filter(form => form.user_id === user_id);
   }

   async deleteById(form_id: string): Promise<void> {
      const index = this.forms.findIndex(form => form.id === form_id);
      this.forms.splice(index, 1);
   }
}


export default FakeFormRepository;
