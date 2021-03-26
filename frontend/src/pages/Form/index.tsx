import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import {
   Container,
   Box,
   Paper,
   Tooltip,
   Fab,
   CardContent,
   Typography,
   Tabs,
   Tab,
   TextField,
   Input,
   FormControl,
   CardActions,
   Divider,
   IconButton,
   Switch,
   MenuItem,
   Select,
   FormControlLabel,
   Radio
} from '@material-ui/core';

import {
   Add,
   AddCircle,
   CheckBox,
   ChevronLeft,
   Clear,
   Delete,
   FileCopy,
   FormatAlignLeft,
   RadioButtonChecked,
   ShortText
} from '@material-ui/icons';

import Header from '../../components/Header';
import QuestionCard from '../../components/QuestionCard';

import { useStyles } from './styles';
import { useAuth } from '../../hooks/auth';


enum EQuestionTypes {
   SA = 'short-answer', // Default
   LA = 'long-answer',
   SC = 'single-choice',
   MC = 'multiple-choice',
   FU = 'file-upload'
}

interface IQuestion {
   type: string;
   content: string;
   options: string[];
   position: number;
   required: boolean;
}

const Form: React.FC = () => {
   const { user } = useAuth();
   const { register, handleSubmit } = useForm();
   const classes = useStyles();

   const [questions, setQuestions] = useState<IQuestion[]>([
   {
      type: EQuestionTypes.SA,
      content: '',
      options: [],
      position: 1,
      required: false
   }]);

   const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(questions[0]);


   const updateQuestion = useCallback((question, ref) => 
   {
      const updated = questions;
      updated[ref] = question;
      setQuestions(updated);
   },
   [questions]);

   const addQuestion = useCallback(() => {
      const question = {
         type: EQuestionTypes.SA,
         content: '',
         options: [],
         position: 0,
         required: false
      }

      setQuestions([
         ...questions,
         question
      ]);
   },
   [questions]);

   const duplicateQuestion = useCallback(event => {
      setQuestions(
      [
         ...questions,
         currentQuestion
      ]);
   },
   [questions, currentQuestion]);

   const removeQuestion = useCallback((event, questionRef) => {
      if (questions.length === 1) {
         return;
      }

      const updated = questions;
      updated.splice(questionRef, 1);
      setQuestions(updated);
   },
   [questions, currentQuestion]);

   const updateQuestionContent = useCallback((event, questionRef) => {
      const question = 
      {
         ...currentQuestion,
         content: event.target.value
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef)
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

   const changeCurrentQuestion = useCallback(event => {
      const index = event.currentTarget.getAttribute('questionRef');
      const question = questions[index];
      setCurrentQuestion(question);
   },
   [questions, currentQuestion]);

   const addQuestionOption = useCallback((event, questionRef) => 
   {
      const { options } = currentQuestion;
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
      const { options } = currentQuestion;
      options[index] = event.target.value;

      const question = {
         ...currentQuestion,
         options
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [currentQuestion]);

   const removeQuestionOption = useCallback((event, index, questionRef) => 
   {
      const { options } = currentQuestion;
      options.splice(index, 1);

      const question = {
         ...currentQuestion,
         options
      };

      setCurrentQuestion(question);
      updateQuestion(question, questionRef);
   },
   [currentQuestion]);

   const toggleQuestionRequired = useCallback((event, questionRef) => {
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
               <Link to="/">
                  <Tab label="Perguntas" />
               </Link>
               <Link to="/">
                  <Tab label="Resoluções" />
               </Link>
            </Tabs>
         </Box>

         <Container maxWidth="md">
            <Box mt={2} maxWidth={768} mx="auto">
               <form autoComplete="off" onSubmit={() => { }}>
                  <Paper>
                     <Box p={2}>
                        <FormControl fullWidth>
                           <Input
                              name="title"
                              placeholder="Título"
                              defaultValue="Formulário sem título"
                              inputRef={register}
                              style={{ fontSize: 32 }}
                           />
                        </FormControl>
                        <FormControl fullWidth style={{ marginTop: 10 }}>
                           <Input
                              name="description"
                              placeholder="Descrição"
                              inputRef={register}
                           />
                        </FormControl>
                     </Box>
                  </Paper>

                  {questions.map((question, questionRef) => (
                     <Box mt={2}>
                        <QuestionCard onMouseEnter={changeCurrentQuestion} questionRef={questionRef}>
                           <CardContent>
                              <Box
                                 display="flex"
                                 alignItems="center"
                              >
                                 <TextField
                                    name="content"
                                    placeholder="Pergunta"
                                    variant="filled"
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
                                    value={question.type}
                                    classes={{ root: classes.root }}
                                 >
                                    <MenuItem value={EQuestionTypes.SA}>
                                       <ShortText
                                          fontSize="small"
                                          style={{ marginRight: 10 }}
                                       />
                                       Resposta curta
                                    </MenuItem>
                                    <MenuItem value={EQuestionTypes.LA}>
                                       <FormatAlignLeft
                                          fontSize="small"
                                          style={{ marginRight: 10 }}
                                       />
                                       Parágrafo
                                    </MenuItem>

                                    <Divider style={{ margin: '10px 0' }} />

                                    <MenuItem value={EQuestionTypes.SC}>
                                       <RadioButtonChecked
                                          fontSize="small"
                                          style={{ marginRight: 10 }}
                                       />
                                       Escolha única
                                    </MenuItem>
                                    <MenuItem value={EQuestionTypes.MC}>
                                       <CheckBox
                                          fontSize="small"
                                          style={{ marginRight: 10 }}
                                       />
                                       Escolha múltipla
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

                              {question.type === EQuestionTypes.SC && 
                              question.options.map((option, index) => 
                              ( 
                                 <Box
                                    key={index}
                                    display="flex"
                                    flexDirection="column"
                                 >
                                    <Box
                                       display="flex"
                                       alignItems="center"
                                    >
                                       <FormControlLabel
                                          label=""
                                          disabled
                                          control={<Radio />}
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
                                             onClick={event => removeQuestionOption(event, index, questionRef)}
                                          >
                                             <Clear />
                                          </IconButton>
                                       )}

                                    </Box>
                                 </Box>
                              ))}

                              {question.type === EQuestionTypes.SC && (
                                 <Box m={2} display="flex">
                                    <Box mx="auto">
                                       <IconButton onClick={event => addQuestionOption(event, questionRef)}>
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
                                    <IconButton onClick={event => removeQuestion(event, questionRef)}>
                                       <Delete />
                                    </IconButton>
                                 </Tooltip>

                                 <Divider orientation="vertical" flexItem />

                                 <Box
                                    ml={2}
                                    display="flex"
                                    alignItems="center"
                                 >
                                    <Typography>
                                       Obrigatório
                                    </Typography>
                                    <Switch
                                       name="required"
                                       color="primary"
                                       tabIndex={-1}

                                       onChange={event => toggleQuestionRequired(event, questionRef)}
                                       checked={question.required}
                                    />
                                 </Box>
                              </Box>
                           </CardActions>
                        </QuestionCard>
                     </Box>
                  ))}
               </form>
            </Box>
         </Container>

         <Link to="/">
            <Tooltip title="Voltar" placement="top">
               <Fab
                  color="primary"
                  style={{
                     position: 'fixed',
                     left: 20,
                     bottom: 30,
                     marginRight: 16
                  }}>
                  <ChevronLeft />
               </Fab>
            </Tooltip>
         </Link>
      </React.Fragment>
   );
};


export default Form;
