import IAnswerDTO from './IAnswerDTO';


export default interface IStoreResolutionDTO {
   answers: IAnswerDTO[];
   from: string;
   form_id: string;
}
