import React, { useState, useCallback, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { format, parseISO } from 'date-fns';

import {
   Box,
   IconButton,
   Typography,

   Container,

   Tooltip,
   Fab,
   TableContainer,
   Table,
   TableBody,
   TableRow,
   TableCell,
   Chip,

   Tab,
   Tabs
} from '@material-ui/core';

import {
   Delete,
   QuestionAnswer,
   ChevronLeft,
   Visibility
} from '@material-ui/icons';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';


interface IResolution {
   id: string;
   from: string;
   created_at: string;
   formattedSentDate: string;
}

interface IParams {
   id: string;
}

const ResolutionList: React.FC = () => {
   const { user } = useAuth();
   const { id: form_id } = useParams<IParams>();
   const [resolutions, setResolutions] = useState<IResolution[]>([]);


   useEffect(() => {
      (async () => {
         const response = await api.get<IResolution[]>(
            `forms/${form_id}/resolutions`
         );
         const draft = response.data.map(resolution => ({
            ...resolution,
            formattedSentDate: format(
               parseISO(resolution.created_at),
               '\'Enviado em\' dd/MM/yyyy'
            ),
         }));
         setResolutions(draft);
      })
      ();
   },
   []);


   const deleteResolution = useCallback(resolutionRef => {

   },
   []);


   return (
      <React.Fragment>
         <Header avatar_url={user.avatar_url} />

         <Box color="inherit" bgcolor="#fff">
            <Tabs
               indicatorColor="primary"
               textColor="primary"
               centered
               value={1}
            >
               <Link to={form_id? `/forms/${form_id}`: '/forms'}>
                  <Tab label="Perguntas" />
               </Link>

               <Link to={`/forms/${form_id}/resolutions`}>
                  <Tab label="Resoluções" />
               </Link>
            </Tabs>
         </Box>

         <Box mt={4}>
            <Container maxWidth="md">
               <Box mt={2} px={2}>
                  {resolutions.length > 0? (
                     <TableContainer>
                        <Table>
                           <TableBody>
                              {resolutions.map((resolution, resolutionRef) => (
                                 <TableRow key={resolution.id}>
                                    <TableCell align="left">
                                       <QuestionAnswer color="primary" />
                                    </TableCell>

                                    <TableCell align="left">
                                       <Link to={`/resolutions/${resolution.id}/view`}>
                                          <Chip label={resolution.from} clickable />
                                       </Link>
                                    </TableCell>

                                    <TableCell >
                                       <Typography variant="body2">
                                          {resolution.formattedSentDate}
                                       </Typography>
                                    </TableCell>

                                    <TableCell width={50}>
                                       <Link to={`/resolutions/${resolution.id}/view`}>
                                          <Tooltip title="Visualizar" placement="top">
                                             <IconButton size="small">
                                                <Visibility fontSize="small" color="action" />
                                             </IconButton>
                                          </Tooltip>
                                       </Link>
                                    </TableCell>

                                    <TableCell width={50}>
                                       <Tooltip title="Deletar" placement="top">
                                          <IconButton size="small" onClick={() => deleteResolution(resolutionRef)}>
                                             <Delete fontSize="small" color="error" />
                                          </IconButton>
                                       </Tooltip>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  ) : (
                     <Typography align="center">
                        Não existem resoluções
                     </Typography>
                  )}
               </Box>
            </Container>
         </Box>
      </React.Fragment>
   );
};


export default ResolutionList;
