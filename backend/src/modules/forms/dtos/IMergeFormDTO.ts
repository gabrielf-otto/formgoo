import IQuestionDTO from './IQuestionDTO';


export default interface IMergeFormDTO {
   title?: string;
   description?: string;
   questions?: IQuestionDTO[];
}
