import IAnswerDTO from './IAnswerDTO';


export default interface IMergeResolutionDTO {
   delivered?: boolean;
   answers?: IAnswerDTO[];
}
