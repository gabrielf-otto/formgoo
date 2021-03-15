
export default interface IQuestionDTO {
   type: string;
   content: string;
   position: number;
   required: boolean;
   options?: string[];
   form_id: string;
}
