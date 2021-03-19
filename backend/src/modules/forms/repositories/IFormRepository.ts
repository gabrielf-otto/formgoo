import Form from '../infra/typeorm/entities/Form';
import IStoreFormDTO from '../dtos/IStoreFormDTO';
import IMergeFormDTO from '../dtos/IMergeFormDTO';
import IFindMyFormDTO from '../dtos/IFindMyFormDTO';


export default interface IFormRepository {
   store: (data: IStoreFormDTO) => Promise<Form>;
   merge: (form: Form, data: IMergeFormDTO) => Promise<Form>;
   save: (form: Form) => Promise<Form>;
   findById: (id: string) => Promise<Form | undefined>;
   findMyForm: (data: IFindMyFormDTO ) => Promise<Form | undefined>;
   findMyForms: (user_id: string) => Promise<Form[]>;
   deleteById: (form_id: string) => Promise<void>;
}
