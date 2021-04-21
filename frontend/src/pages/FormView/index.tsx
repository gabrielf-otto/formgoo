import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';

import {
   Container,
   Box,
   FormControl,
   Card,
   Paper,
   Input,
   CardContent,
   TextField,
   Divider,
   MenuItem,
   Typography,
   RadioGroup,
   FormControlLabel,
   Radio,
   Checkbox,
   Tooltip,
   Fab,
   Button
} from '@material-ui/core';

import api from '../../services/api';


enum EQuestionTypes {
   SA = 'short-answer',
   LA = 'long-answer',
   SC = 'single-choice',
   MC = 'multiple-choice',
   FU = 'file-upload'
}

interface IForm {
   title: string;
   description: string;
   questions: IQuestion[];
}

interface IQuestion {
   id: string;
   type: string;
   content: string;
   options: IOption[];
   position: number;
   required: boolean;
}

interface IOption {
   content: string;
   inputRef: React.RefObject<HTMLInputElement>;
}

interface IAnswer {
   id?: string;
   content: string | string[];
   attachment?: string;
   question_id: IQuestion;
}

interface IParams {
   id: string;
}

const FormView: React.FC = () => {
   const { id: form_id } = useParams<IParams>();
   const [form, setForm] = useState<IForm>({} as IForm);
   const [answers, setAnswers] = useState<IAnswer[]>([]);
   const [currentAnswer, setCurrentAnswer] = useState<IAnswer>({} as IAnswer);

   useEffect(() => {
      (async () => {
         const { data: draft } = await api.get<IForm>(
            `/forms/${form_id}/view`
         );

         const questions = draft.questions.map(question => {
            let options: any[] = question.options;

            if (question.type === EQuestionTypes.MC) {
               options = question.options.map(option => {
                  return {
                     content: option,
                     inputRef: React.createRef()
                  };
               });

               console.log(options);
            }

            return {
               ...question,
               options
            }
         });

         draft.questions = questions;
         setForm(draft);
      })
      ();
   },
   []);

   const changeCurrentAnswer = useCallback(questionId => 
   {
      const draft = Array.from(answers);
      const answer = draft.find(answer => answer.question_id === questionId);
      setCurrentAnswer(answer as IAnswer);
   },
   [answers]);

   const updateAnswer = useCallback((answer, questionId) => 
   {
      const draft = Array.from(answers);
      const index = draft.findIndex(answer => answer.question_id === questionId);
      draft[index] = answer;
      setAnswers(draft);
   },
   [answers, currentAnswer]);

   const updateAnswerContent = useCallback((event, questionId) => 
   {
      let answer = { ...currentAnswer };
      const question = form.questions.find(question => question.id === questionId);

      if (question?.type === EQuestionTypes.MC) {
         console.log(event.target);
      }
      else {
         answer.content = event.target.value;
      }

      setCurrentAnswer(answer);
      updateAnswer(answer, questionId);    
   },
   [form, currentAnswer]);

   const sendResolution = useCallback(() => {

   },
   []);


   return (
      <Container maxWidth="md">
         <Box mt={2} maxWidth={768} mx="auto">
            <form autoComplete="off">
               <Card>
                  <Box p={2}>
                     <Typography style={{fontSize: 32}}>
                        {form.title}
                     </Typography>
                     
                     <Divider 
                        style={{
                           margin: '10px 0'
                        }}
                     />

                     <Typography>
                        {form.description}
                     </Typography>
                  </Box>
               </Card>

               {form.questions?.map(question => (
                  <Box mt={2}>
                     <Card onMouseEnter={() => changeCurrentAnswer(question.id)}>
                        <CardContent>
                           <Box display="flex" flexDirection="column">
                              <Typography variant="h6">
                                 {question.content}
                              </Typography>

                              <Divider 
                                 style={{
                                    margin: '10px 0'
                                 }}
                              />

                              {question.type === EQuestionTypes.SA && (
                                 <TextField
                                    name="content"
                                    placeholder="Sua resposta"
                                    variant="filled"
                                    tabIndex={-1}

                                    onChange={event => updateAnswerContent(event, question.id)}
                                 />
                              )}

                              {question.type === EQuestionTypes.LA && (
                                 <TextField
                                    name="content"
                                    placeholder="Sua resposta"
                                    variant="filled"
                                    multiline
                                    rows={4}
                                    tabIndex={-1}

                                    onChange={event => updateAnswerContent(event, question.id)}
                                 />
                              )}

                              {question.type === EQuestionTypes.SC && (
                                 <RadioGroup name="">
                                    {question.options.map(option => (
                                       <FormControlLabel 
                                          value={option} 
                                          label={option}
                                          control={<Radio color="primary" />} 
                                          onChange={event => updateAnswerContent(event, question.id)}
                                       />
                                    ))}
                                 </RadioGroup>
                              )}

                              {question.type === EQuestionTypes.MC && (
                                 <>
                                    {question.options.map(option => (
                                       <FormControlLabel 
                                          value={option} 
                                          label={option}
                                          control={<Checkbox color="primary" />} 
                                          ref={option.inputRef}
                                          onChange={event => updateAnswerContent(event, question.id)}
                                       />
                                    ))}
                                 </>
                              )}
                           </Box>
                        </CardContent>
                     </Card>
                  </Box>
               ))}

               <Box mt={2}>
                  <Button color="primary" variant="contained" onClick={sendResolution}>Enviar</Button>
               </Box>
            </form>
         </Box>
      </Container>
   );
};


export default FormView;
