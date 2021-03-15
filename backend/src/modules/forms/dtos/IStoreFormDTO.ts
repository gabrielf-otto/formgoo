import IQuestionDTO from './IQuestionDTO';


export default interface IStoreFormDTO {
   title: string;
   description?: string;
   questions: IQuestionDTO[];
   user_id: string;
}
