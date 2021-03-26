import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import formIcon from '../../assets/formIcon.svg';

import {
   Box,
   IconButton,
   Typography,
   Divider,

   Container,

   Grid,
   CardContent,
   Tooltip,
   Fab,
   TableContainer,
   Table,
   TableBody,
   TableRow,
   TableCell,
   Chip,
   MenuItem,
   Menu
} from '@material-ui/core';

import {
   Add,
   Delete,
   Edit,
   ViewList,
   QuestionAnswer,
   List,
   Apps,
   MoreVert
} from '@material-ui/icons';

import Header from '../../components/Header';
import { FormCard } from './styles';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';


enum EViewMode {
   LIST,
   GRID
}

interface IFormData {
   id: string;
   title: string;
   description?: string;
   user_id: string;
   created_at: string;
   formattedDate: string;
}

const Dashboard: React.FC = () => {
   const { user } = useAuth();

   const [viewMode, setViewMode] = useState<EViewMode>(EViewMode.GRID);
   const [forms, setForms] = useState<IFormData[]>([]);


   useEffect(() => {
      api.get('/forms').then(response => {
         const forms = response.data.map((form: IFormData) => ({
            ...form,
            formattedDate: format(
               parseISO(form.created_at),
               '\'Criado em\' dd/MM/yyyy'
            )
         }));

         setForms(forms);
      });
   },
      []);

   return (
      <React.Fragment>
         <Header avatar_url={user.avatar_url} />

         <Box mt={4}>
            <Container maxWidth="md">
               <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <Typography variant="h6">
                     Formulários
                  </Typography>

                  {viewMode === EViewMode.GRID ? (
                     <Tooltip title="Visualizar em lista">
                        <IconButton size="small" onClick={() => setViewMode(EViewMode.LIST)}>
                           <List />
                        </IconButton>
                     </Tooltip>
                  ) : (
                     <Tooltip title="Visualizar em grade">
                        <IconButton size="small" onClick={() => setViewMode(EViewMode.GRID)}>
                           <Apps />
                        </IconButton>
                     </Tooltip>
                  )}
               </Box>

               <br />
               <Divider />

               <Box mt={2} px={2}>
                  {viewMode === EViewMode.GRID ? (
                     <Grid container spacing={2}>
                        {forms.map(form => (
                           <Grid item key={form.id} md={4} xs={12}>
                              <Link to="">
                                 <FormCard>
                                    <CardContent>
                                       <Box
                                          mb={1}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="center"
                                       >
                                          <img
                                             src={formIcon}
                                             alt="Form Icon"
                                          />
                                       </Box>

                                       <Box
                                          mb={1}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                       >
                                          <Typography variant="body1">
                                             {form.title}
                                          </Typography>
                                       </Box>
                                       <Divider />

                                       <Box
                                          mt={2}
                                          display="flex"
                                          alignItems="center"
                                          justifyContent="space-between"
                                       >
                                          <Box display="flex" alignItems="center">
                                             <ViewList
                                                color="primary"
                                                fontSize="small"
                                                style={{ marginRight: 10 }}
                                             />

                                             <Typography variant="caption">
                                                {form.formattedDate}
                                             </Typography>
                                          </Box>

                                          <IconButton size="small">
                                             <MoreVert />
                                          </IconButton>

                                          <Menu
                                             keepMounted
                                             open={false}
                                             // anchorEl={anchorEl}
                                             // open={Boolean(anchorEl)}
                                             // onClose={handleClose}
                                          >
                                             <MenuItem>
                                                Profile
                                             </MenuItem>
                                             <MenuItem>
                                                My account
                                             </MenuItem>
                                             <MenuItem>
                                                Logout
                                             </MenuItem>
                                          </Menu>
                                       </Box>
                                    </CardContent>
                                 </FormCard>
                              </Link>
                           </Grid>
                        ))}
                     </Grid>
                  ) : (
                     <TableContainer>
                        <Table>
                           <TableBody>
                              {forms.map(form => (
                                 <TableRow key={form.id}>
                                    <TableCell align="left">
                                       <img
                                          src={formIcon}
                                          alt="Form Icon"
                                          style={{ width: 26 }}
                                       />
                                    </TableCell>
                                    <TableCell align="left">
                                       <Link to="">
                                          <Chip label={form.title} clickable />
                                       </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                       {form.formattedDate}
                                    </TableCell>
                                    <TableCell width={50}>
                                       <Tooltip title="Resoluções" placement="top">
                                          <IconButton size="small">
                                             <QuestionAnswer fontSize="small" />
                                          </IconButton>
                                       </Tooltip>
                                    </TableCell>

                                    <TableCell width={50}>
                                       <Tooltip title="Editar" placement="top">
                                          <IconButton size="small">
                                             <Edit fontSize="small" />
                                          </IconButton>
                                       </Tooltip>
                                    </TableCell>

                                    <TableCell width={50}>
                                       <Tooltip title="Deletar" placement="top">
                                          <IconButton size="small">
                                             <Delete fontSize="small" />
                                          </IconButton>
                                       </Tooltip>
                                    </TableCell>
                                 </TableRow>
                              ))}
                           </TableBody>
                        </Table>
                     </TableContainer>
                  )}
               </Box>
            </Container>

            <Link to="/forms">
               <Tooltip title="Novo" placement="top">
                  <Fab
                     color="primary"
                     style={{
                        position: 'fixed',
                        right: 20,
                        bottom: 30,
                        marginRight: 16
                     }}>
                     <Add />
                  </Fab>
               </Tooltip>
            </Link>

         </Box>
      </React.Fragment>
   );
};


export default Dashboard;
