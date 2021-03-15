import IAnswerDTO from './IAnswerDTO';


export default interface IStoreResolutionDTO {
   delivered: boolean;
   answers: IAnswerDTO[];
   form_id: string;
   user_id: string;
}
