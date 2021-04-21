import React, { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
   Container,
   Box,
   Tooltip,
   Fab,
   CardContent,
   Typography,
   Tabs,
   Tab,
   TextField,
   Input,
   FormControl,
   Card,
   CardActions,
   Divider,
   IconButton,
   Switch,
   MenuItem,
   Select,
   FormControlLabel,
   Radio,
   Checkbox,
   Button
} from '@material-ui/core';

import {
   Add,
   AddCircle,
   CheckBox,
   ChevronLeft,
   Clear,
   CloudUpload,
   Delete,
   FileCopy,
   FormatAlignLeft,
   RadioButtonChecked,
   Save,
   ShortText
} from '@material-ui/icons';

import Header from '../../components/Header';

import { useStyles } from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';


enum EQuestionTypes {
   SA = 'short-answer',
   LA = 'long-answer',
   SC = 'single-choice',
   MC = 'multiple-choice',
   FU = 'file-upload'
}

interface IForm {
   id?: string;
   title: string;
   description?: string;
   questions: IQuestion[];
}

interface IQuestion {
   id?: string;
   type: string;
   content: string;
   options: string[];
   position: number;
   required: boolean;
}

interface IParams {
   id: string;
}

const Form: React.FC = () => {
   const { user } = useAuth();
   const { id: form_id } = useParams<IParams>();

   const classes = useStyles();

   const [form, setForm] = useState<IForm>({} as IForm);
   const [questions, setQuestions] = useState<IQuestion[]>([{} as IQuestion]);
   const [currentQuestion, setCurrentQuestion] = useState<IQuestion>({} as IQuestion);

   useEffect(() => {
      if (form_id) {
         (async () => {
            const { data: form } = await api.get<IForm>(
               `/forms/${form_id}`
            );
            setForm(form);
            setQuestions(form.questions);
         })
         ();
      }
   },
   [form_id]);


   const saveForm = useCallback(() => {
      const { title, description } = form;

      if (form_id && form.id) 
      {
         api.put(`/forms/${form_id}`, {
            title,
            description,
            questions
         })
         .then(() => {
            
         });
      }
      else {
         api.post(`/forms/${form_id}`, {
            title,
            description,
            questions
         })
         .then(() => {

         });
      }
   },
   [questions, form]);

   const updateFormTitle = useCallback(event => {
      const draft = {
         ...form,
         title: event.target.value
      };

      setForm(draft);
   },
   [form]);

   const updateFormDescription = useCallback(event => {
      const draft = {
         ...form,
         description: event.target.value
      };

      setForm(draft);
   },
   [form]);

   const updateQuestion = useCallback((question, ref) => 
   {
      const draft = Array.from(questions);
      draft[ref] = question;
      setQuestions(draft);
   },
   [questions]);

   const addQuestion = useCallback(() => {
      setQuestions([
         ...questions,
         {} as IQuestion
      ]);
   },
   [questions]);

   const duplicateQuestion = useCallback(() => {
      setQuestions(
      [
         ...questions,
         currentQuestion
      ]);
   },
   [questions, currentQuestion]);

   const removeQuestion = useCallback(questionRef => {
      if (questions.length === 1) {
         return;
      }

      const draft = Array.from(questions);
      draft.splice(questionRef, 1);

      setQuestions(draft);
      setCurrentQuestion(questions[0]);
   },
   [questions, currentQuestion]);

   const updateQuestionContent = useCallback((event, questionRef) => {
      const question = 
      {
         ...currentQuestion,
         content: event.target.value
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [currentQuestion, questions]);

   const setQuestionType = useCallback((event, questionRef) => {
      const type = event.target.value;
      const question =
      {
         ...currentQuestion,
         type
      };

      if ((type === EQuestionTypes.SC && type !== currentQuestion.type) ||
         (type === EQuestionTypes.MC && type !== currentQuestion.type)) 
      {
         question.options = [''];
      }

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [questions, currentQuestion]);

   const addQuestionOption = useCallback(questionRef => 
   {
      const options = Array.from(currentQuestion.options);
      const { length } = options;

      if (!options[length - 1]) {
         return;
      }

      options.push('');
      const question = 
      {
         ...currentQuestion,
         options
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [questions, currentQuestion]);

   const updateQuestionOption = useCallback((event, index, questionRef) => 
   {
      const options = Array.from(currentQuestion.options);
      options[index] = event.target.value;

      const question = {
         ...currentQuestion,
         options
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [questions, currentQuestion]);

   const removeQuestionOption = useCallback((index, questionRef) => 
   {
      const options = Array.from(currentQuestion.options);
      options.splice(index, 1);

      const question = {
         ...currentQuestion,
         options
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [questions, currentQuestion]);

   const toggleQuestionRequired = useCallback(questionRef => {
      const question = 
      {
         ...currentQuestion,
         required: !currentQuestion.required
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [questions, currentQuestion]);


   return (
      <React.Fragment>
         <Header avatar_url={user.avatar_url} />

         <Box color="inherit" bgcolor="#fff">
            <Tabs
               indicatorColor="primary"
               textColor="primary"
               centered
               value={0}
            >
               <Link to={form_id? `/forms/${form_id}`: '/forms'}>
                  <Tab label="Perguntas" />
               </Link>

               {form_id && form.id? (
                  <Link to={`/forms/${form_id}/resolutions`}>
                     <Tab label="Resoluções" />
                  </Link>
               ) : (
                  <Tab label="Resoluções" disabled />
               )}
               
            </Tabs>
         </Box>

         <Container maxWidth="md">
            <Box mt={2} maxWidth={768} mx="auto">
               <form autoComplete="off">
                  <Card>
                     <Box p={2}>
                        <FormControl fullWidth>
                           <Input
                              name="title"
                              placeholder="Título"
                              value={form.title?? 'Formulário sem título'}
                              onChange={event => updateFormTitle(event)}
                              style={{ fontSize: 32 }}
                           />
                        </FormControl>
                        <FormControl fullWidth style={{ marginTop: 10 }}>
                           <Input
                              name="description"
                              placeholder="Descrição"
                              value={form.description?? ''}
                              onChange={event => updateFormDescription(event)}
                           />
                        </FormControl>
                     </Box>
                  </Card>

                  {questions.map((question, questionRef) => (
                     <Box mt={2}>
                        <Card onMouseEnter={() => setCurrentQuestion(questions[questionRef])}>
                           <CardContent>
                              <Box display="flex" alignItems="flex-start">
                                 <TextField
                                    name="content"
                                    placeholder="Pergunta"
                                    variant="filled"
                                    multiline
                                    tabIndex={-1}

                                    onChange={event => updateQuestionContent(event, questionRef)}
                                    value={question.content}
                                    style={{ flex: 1 }}
                                 />

                                 <Divider
                                    flexItem
                                    orientation="vertical"
                                    style={{ margin: '0 10px' }}
                                 />

                                 <Select
                                    autoWidth
                                    name="type"
                                    variant="outlined"
                                    tabIndex={-1}

                                    onChange={event => setQuestionType(event, questionRef)}
                                    defaultValue={EQuestionTypes.SA}
                                    value={question.type?? EQuestionTypes.SA}
                                    classes={{ root: classes.root }}
                                 >
                                    <MenuItem value={EQuestionTypes.SA}>
                                       <ShortText fontSize="small" style={{ marginRight: 10 }} />
                                       Resposta curta
                                    </MenuItem>

                                    <MenuItem value={EQuestionTypes.LA}>
                                       <FormatAlignLeft fontSize="small" style={{ marginRight: 10 }} />
                                       Parágrafo
                                    </MenuItem>

                                    <Divider 
                                       style={{ 
                                          margin: '10px 0' 
                                       }} 
                                    />

                                    <MenuItem value={EQuestionTypes.SC}>
                                       <RadioButtonChecked fontSize="small" style={{ marginRight: 10 }} />
                                       Escolha única
                                    </MenuItem>
                                    
                                    <MenuItem value={EQuestionTypes.MC}>
                                       <CheckBox fontSize="small" style={{ marginRight: 10 }} />
                                       Escolha múltipla
                                    </MenuItem>

                                    <Divider 
                                       style={{ 
                                          margin: '10px 0' 
                                       }} 
                                    />

                                    <MenuItem value={EQuestionTypes.FU}>
                                       <CloudUpload fontSize="small" style={{ marginRight: 10 }} />
                                       Ficheiro
                                    </MenuItem>
                                 </Select>
                              </Box>

                              <br />
                              <Divider />
                              <br />

                              {question.type === EQuestionTypes.SA && (
                                 <Typography variant="body2">
                                    Texto de resposta curta
                                 </Typography>
                              )}

                              {question.type === EQuestionTypes.LA && (
                                 <Typography variant="body2">
                                    Texto de resposta longa
                                 </Typography>
                              )}

                              {(question.type === EQuestionTypes.SC ||
                              question.type === EQuestionTypes.MC) && 
                              question.options.map((option, index) => 
                              ( 
                                 <Box key={index} display="flex" flexDirection="column">
                                    <Box display="flex" alignItems="center">
                                       <FormControlLabel
                                          label=""
                                          disabled
                                          control={question.type === EQuestionTypes.SC? (<Radio />): (<Checkbox />)}
                                       />
                                       
                                       <Input
                                          fullWidth
                                          placeholder="Conteúdo"
                                          tabIndex={-1}

                                          onChange={event => updateQuestionOption(event, index, questionRef)}
                                          value={option?? ''}
                                          style={{ marginRight: 10 }}
                                       />

                                       {question.options.length > 1 && (
                                          <IconButton
                                             size="small"
                                             onClick={() => removeQuestionOption(index, questionRef)}
                                          >
                                             <Clear />
                                          </IconButton>
                                       )}

                                    </Box>
                                 </Box>
                              ))}

                              {(question.type === EQuestionTypes.SC ||
                              question.type === EQuestionTypes.MC) && 
                              (
                                 <Box m={2} display="flex">
                                    <Box mx="auto">
                                       <IconButton 
                                          onClick={() => addQuestionOption(questionRef)} 
                                          disabled={!question.options[question.options.length - 1]}
                                       >
                                          <AddCircle />
                                       </IconButton>
                                    </Box>
                                 </Box>
                              )}

                           </CardContent>

                           <Divider />

                           <CardActions>
                              <Box
                                 display="flex"
                                 alignItems="center"
                                 justifyContent="flex-end"
                                 flexGrow={1}
                              >
                                 <Tooltip title="Duplicar">
                                    <IconButton onClick={duplicateQuestion}>
                                       <FileCopy />
                                    </IconButton>
                                 </Tooltip>

                                 <Tooltip title="Deletar">
                                    <IconButton 
                                       onClick={() => removeQuestion(questionRef)} 
                                       disabled={questions.length === 1 && questionRef === 0}
                                    >
                                       <Delete />
                                    </IconButton>
                                 </Tooltip>

                                 <Divider 
                                    orientation="vertical" 
                                    flexItem 
                                 />

                                 <Box ml={2} display="flex" alignItems="center">
                                    <Typography>
                                       Obrigatório
                                    </Typography>

                                    <Switch
                                       name="required"
                                       color="primary"
                                       tabIndex={-1}

                                       onChange={() => toggleQuestionRequired(questionRef)}
                                       checked={!!question.required}
                                    />
                                 </Box>
                              </Box>
                           </CardActions>
                        </Card>
                     </Box>
                  ))}

                  <Box mt={2} display="flex">
                     <Button 
                        onClick={addQuestion}
                        style={{
                           flexGrow: 1, 
                           padding: 20, 
                           color: '#666',
                           border: '1px dashed #666',
                        }}
                     >
                        <Add />
                     </Button>
                  </Box>
               </form>
            </Box>
         </Container>

         <Link to="/">
            <Tooltip title="Voltar" placement="top">
               <Fab
                  color="primary"
                  style={{
                     position: 'fixed',
                     left: 40,
                     bottom: 40
                  }}>
                  <ChevronLeft />
               </Fab>
            </Tooltip>
         </Link>

         <Tooltip title="Salvar" placement="top">
            <Fab
               onClick={saveForm}
               color="primary"
               style={{
                  position: 'fixed',
                  right: 40,
                  bottom: 40
               }}>
               <Save />
            </Fab>
         </Tooltip>
      </React.Fragment>
   );
};


export default Form;
