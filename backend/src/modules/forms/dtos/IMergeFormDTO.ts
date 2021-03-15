import IQuestionDTO from './IQuestionDTO';


export default interface IMergeResolutionDTO {
   title?: string;
   description?: string;
   questions?: IQuestionDTO[];
}
