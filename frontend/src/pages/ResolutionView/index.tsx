import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { 
   Box, 
   Card, 
   CardContent, 
   Checkbox, 
   Container, 
   Divider, 
   Fab, 
   FormControlLabel, 
   FormGroup, 
   Radio, 
   RadioGroup, 
   Tooltip, 
   Typography
} from '@material-ui/core';

import { ChevronLeft } from '@material-ui/icons';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';


enum EQuestionTypes {
   SA = 'short-answer',
   LA = 'long-answer',
   SC = 'single-choice',
   MC = 'multiple-choice',
   FU = 'file-upload'
}

interface IQuestion {
   id: string;
   type: string;
   content: string;
   options: string[];
   position: number;
   required: boolean;
}

interface IResolution {
   id: string;
   from: string;
   answers: IAnswer[];
   form_id: string;
}

interface IAnswer {
   id: string;
   content: string | string[];
   attachment?: string;
   question: IQuestion;
}

interface IParams {
   id: string;
}

const ResolutionView: React.FC = () => {
   const { user } = useAuth();
   const { id: resolution_id } = useParams<IParams>();
   const [resolution, setResolution] = useState<IResolution>();

   useEffect(() => {
      (async () => {
         const { data: resolution } = await api.get<IResolution>(
            `/resolutions/${resolution_id}`
         );
         setResolution(resolution);
      })
      ();
   },
   []);


   return (
      <React.Fragment>
         <Header avatar_url={user.avatar_url} />

         <Box mt={4}>
            <Container maxWidth="md">
               <Box mt={2} maxWidth={768} mx="auto">
                  {resolution?.answers.map(answer => (
                     <Box mt={2}>
                        <Card>
                           <CardContent>
                              <Typography variant="h6">
                                 {answer.question.content}
                              </Typography>

                              <Divider 
                                 style={{
                                    margin: '10px 0 20px 0'
                                 }}
                              />

                              {(answer.question.type === EQuestionTypes.SA) ||
                              (answer.question.type === EQuestionTypes.LA) && (
                                 <Typography variant="body1">
                                    {answer.content}
                                 </Typography>
                              )}

                              {answer.question.type === EQuestionTypes.SC && (
                                 <RadioGroup>
                                    {answer.question.options.map(option => (
                                       <FormControlLabel 
                                          control={<Radio />} 
                                          label={option} 
                                          checked={option === answer.content} 
                                          disabled 
                                       />
                                    ))}                                    
                                 </RadioGroup>
                              )}

                              {answer.question.type === EQuestionTypes.MC && (
                                 <FormGroup>
                                    {answer.question.options.map((option, index) => (
                                       <>
                                       <FormControlLabel 
                                          control={<Checkbox />} 
                                          label={option} 
                                          checked
                                          disabled 
                                       />

                                       <Typography>
                                          {/* {option} */}
                                          {(Array(answer.content))[0]}
                                       </Typography>
                                       </>
                                    ))} 
                                 </FormGroup>                                   
                              )}                              

                           </CardContent>
                        </Card>
                     </Box>
                  ))}
               </Box>
            </Container>

            <Link to={`/forms/${resolution?.form_id}/resolutions`}>
               <Tooltip title="Novo" placement="top">
                  <Fab
                     color="primary"
                     style={{
                        position: 'fixed',
                        left: 40,
                        bottom: 40
                     }}
                  >
                     <ChevronLeft />
                  </Fab>
               </Tooltip>
            </Link>

         </Box>
      </React.Fragment>
   );
};


export default ResolutionView;
