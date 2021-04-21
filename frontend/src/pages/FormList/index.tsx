import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseISO, format } from 'date-fns';

import formIcon from '../../assets/formIcon.svg';

import {
   Box,
   IconButton,
   Typography,
   Divider,
   Card,

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
   Menu,
   ListItemIcon,
   ListItemText,

   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   DialogContentText,
   InputBase,
   Paper
} from '@material-ui/core';

import {
   Add,
   Delete,
   Edit,
   ViewList,
   QuestionAnswer,
   List,
   Apps,
   MoreVert,
   Send
} from '@material-ui/icons';

import Header from '../../components/Header';
import { FormCard } from './styles';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';


enum EViewMode {
   LIST = 'LIST',
   GRID = 'GRID'
}

interface IFormData {
   id: string;
   title: string;
   description?: string;
   user_id: string;
   created_at: string;
   formattedDate: string;

   actions: {
      menuAnchorRef: HTMLElement | null;
      popoverAnchorRef: HTMLElement | null;
      isSendFormDialogOpened: boolean;
      isConfirmDeleteDialogOpened: boolean;
   }
}

const FormList: React.FC = () => {
   const { user } = useAuth();

   const [forms, setForms] = useState<IFormData[]>([]);
   const [viewMode, setViewMode] = useState<EViewMode>((): EViewMode => 
   {
      const rm = localStorage.getItem('@formgoo:listFormViewMode');
      if (rm) {
         return rm as EViewMode;
      }
      return EViewMode.GRID;
   });


   useEffect(() => {
      (async () => {
         const response = await api.get('/forms');
         const forms = response.data.map((form: IFormData) => ({
            ...form,
            formattedDate: format(
               parseISO(form.created_at),
               '\'Criado em\' dd/MM/yyyy'
            ),

            actions: {
               menuAnchorRef: null,
               popoverAnchorRef: null,
               isSendFormDialogOpened: false,
               isConfirmDeleteDialogOpened: false
            }
         }));

         setForms(forms);
      })
      ();
   },
   []);

   const changeViewMode = useCallback(viewMode => {
      localStorage.setItem('@formgoo:listFormViewMode', viewMode);
      setViewMode(viewMode);
   },
   []);

   const openActionsMenu = useCallback((event, formRef) => {
      const draft = Array.from(forms);
      draft[formRef].actions.menuAnchorRef = event.currentTarget;
      setForms(draft);
   },
   [forms]);

   const closeActionsMenu = useCallback(formRef => {
      const draft = Array.from(forms);
      draft[formRef].actions.menuAnchorRef = null;
      setForms(draft);
   },
   [forms]);

   const openSendFormDialog = useCallback(formRef => {
      const draft = Array.from(forms);
      draft[formRef].actions.menuAnchorRef = null;
      draft[formRef].actions.isSendFormDialogOpened = true;
      setForms(draft);
   },
   [forms]);

   const closeSendFormDialog = useCallback(formRef => {
      const draft = Array.from(forms);
      draft[formRef].actions.isSendFormDialogOpened = false;
      setForms(draft);
   },
   [forms]);

   const sendForm = useCallback(formRef => {

   },
   []);

   const openConfirmDeleteFormDialog = useCallback(formRef => {
      const draft = Array.from(forms);
      draft[formRef].actions.menuAnchorRef = null;
      draft[formRef].actions.isConfirmDeleteDialogOpened = true;
      setForms(draft);
   },
   [forms]);

   const closeConfirmDeleteFormDialog = useCallback(formRef => {
      const draft = Array.from(forms);
      draft[formRef].actions.isConfirmDeleteDialogOpened = false;
      setForms(draft);
   },
   [forms]);

   const deleteForm = useCallback(formRef => {
      const draft = Array.from(forms);
      draft.splice(formRef, 1);
      setForms(draft);
   },
   [forms]);


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
                        <IconButton size="small" onClick={() => changeViewMode(EViewMode.LIST)}>
                           <List />
                        </IconButton>
                     </Tooltip>
                  ) : (
                     <Tooltip title="Visualizar em grade">
                        <IconButton size="small" onClick={() => changeViewMode(EViewMode.GRID)}>
                           <Apps />
                        </IconButton>
                     </Tooltip>
                  )}
               </Box>

               <br />
               <Divider />

               <Box mt={2} px={2}>
                  {viewMode === EViewMode.GRID ?
                     (
                        <Grid container spacing={2}>
                           {forms.map((form, formRef) => (
                              <Grid item key={form.id} md={4} xs={12}>
                                 <Card>
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

                                          <IconButton size="small" onClick={event => openActionsMenu(event, formRef)}>
                                             <MoreVert />
                                          </IconButton>

                                          <Menu
                                             keepMounted
                                             anchorEl={form.actions.menuAnchorRef}
                                             open={!!form.actions.menuAnchorRef}
                                             onClose={() => closeActionsMenu(formRef)}
                                          >
                                             <MenuItem onClick={() => openSendFormDialog(formRef)}>
                                                <Box display="flex" alignItems="center">
                                                   <ListItemIcon style={{ minWidth: 40 }}>
                                                      <Send fontSize="small" color="primary" />
                                                   </ListItemIcon>
                                                   <ListItemText primary="Enviar" />
                                                </Box>
                                             </MenuItem>

                                             <Divider 
                                                style={{
                                                   margin: '10px 0'
                                                }}
                                             />

                                             <MenuItem onClick={() => closeActionsMenu(formRef)}>
                                                <Link to={`forms/${form.id}/resolutions`}>
                                                   <Box display="flex" alignItems="center">
                                                      <ListItemIcon style={{ minWidth: 40 }}>
                                                         <QuestionAnswer fontSize="small" color="primary" />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Resoluções" />
                                                   </Box>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={() => closeActionsMenu(formRef)}>
                                                <Link to={`forms/${form.id}`}>
                                                   <Box display="flex" alignItems="center">
                                                      <ListItemIcon style={{ minWidth: 40 }}>
                                                         <Edit fontSize="small" color="action" />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Editar" />
                                                   </Box>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={() => openConfirmDeleteFormDialog(formRef)}>
                                                <Box display="flex" alignItems="center">
                                                   <ListItemIcon style={{ minWidth: 40 }}>
                                                      <Delete fontSize="small" color="error" />
                                                   </ListItemIcon>
                                                   <ListItemText primary="Deletar" />
                                                </Box>
                                             </MenuItem>

                                             <Dialog
                                                open={form.actions.isSendFormDialogOpened}
                                                onClose={() => closeSendFormDialog(formRef)}
                                             >
                                                <DialogTitle>{form.title}</DialogTitle>
                                                <DialogContent>
                                                   <DialogContentText>
                                                      Enviar formulário para:
                                                   </DialogContentText>
                                                   <Paper>
                                                      <InputBase 
                                                         placeholder="Email" 
                                                         style={{padding: 10, width: 400}}
                                                      />
                                                   </Paper>
                                                   
                                                </DialogContent>

                                                <DialogActions>
                                                   <Button onClick={() => closeSendFormDialog(formRef)} color="inherit">
                                                      Cancelar
                                                   </Button>
                                                   <Button onClick={() => sendForm(formRef)} color="primary">
                                                      Enviar
                                                   </Button>
                                                </DialogActions>
                                             </Dialog>

                                             <Dialog
                                                open={form.actions.isConfirmDeleteDialogOpened}
                                                onClose={() => closeConfirmDeleteFormDialog(formRef)}
                                             >
                                                <DialogTitle>{form.title}</DialogTitle>
                                                <DialogContent>
                                                   <DialogContentText>
                                                      Tem certeza que deseja deletar o formulário?
                                                   </DialogContentText>
                                                </DialogContent>

                                                <DialogActions>
                                                   <Button onClick={() => closeConfirmDeleteFormDialog(formRef)} color="primary">
                                                      Cancelar
                                                   </Button>
                                                   <Button onClick={() => deleteForm(formRef)} color="secondary">
                                                      Confirmar
                                                   </Button>
                                                </DialogActions>
                                             </Dialog>
                                          </Menu>
                                       </Box>
                                    </CardContent>
                                 </Card>
                              </Grid>
                           ))}
                        </Grid>
                     ) : (
                        <TableContainer>
                           <Table>
                              <TableBody>
                                 {forms.map((form, formRef) => (
                                    <TableRow key={form.id}>
                                       <TableCell align="left">
                                          <img
                                             src={formIcon}
                                             alt="Form Icon"
                                             style={{ width: 26 }}
                                          />
                                       </TableCell>

                                       <TableCell align="left">
                                          <Link to={`/forms/${form.id}`}>
                                             <Chip label={form.title} clickable />
                                          </Link>
                                       </TableCell>

                                       <TableCell align="left">
                                          {form.formattedDate}
                                       </TableCell>

                                       <TableCell width={50}>
                                          <Tooltip title="Enviar" placement="top">
                                             <IconButton size="small" onClick={() => {}}>
                                                <Send fontSize="small" color="primary" />
                                             </IconButton>
                                          </Tooltip>
                                       </TableCell>

                                       <TableCell width={50}>
                                          <Link to={`/forms/${form.id}/resolutions`}>
                                             <Tooltip title="Resoluções" placement="top">
                                                <IconButton size="small">
                                                   <QuestionAnswer fontSize="small" color="primary" />
                                                </IconButton>
                                             </Tooltip>
                                          </Link>
                                       </TableCell>

                                       <TableCell width={50}>
                                          <Link to={`forms/${form.id}`}>
                                             <Tooltip title="Editar" placement="top">
                                                <IconButton size="small">
                                                   <Edit fontSize="small" color="action" />
                                                </IconButton>
                                             </Tooltip>
                                          </Link>
                                       </TableCell>

                                       <TableCell width={50}>
                                          <Tooltip title="Deletar" placement="top">
                                             <IconButton size="small" onClick={() => openConfirmDeleteFormDialog(formRef)}>
                                                <Delete fontSize="small" color="error" />
                                             </IconButton>
                                          </Tooltip>
                                       </TableCell>

                                       <Dialog
                                          open={form.actions.isConfirmDeleteDialogOpened}
                                          onClose={() => closeConfirmDeleteFormDialog(formRef)}
                                       >
                                          <DialogTitle>{form.title}</DialogTitle>
                                          <DialogContent>
                                             <DialogContentText>
                                                Tem certeza que deseja deletar o formulário?
                                             </DialogContentText>
                                          </DialogContent>

                                          <DialogActions>
                                             <Button onClick={() => closeConfirmDeleteFormDialog(formRef)} color="primary">
                                                Cancelar
                                             </Button>
                                             <Button onClick={() => deleteForm(formRef)} color="secondary">
                                                Confirmar
                                             </Button>
                                          </DialogActions>
                                       </Dialog>
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
                        right: 40,
                        bottom: 40
                     }}
                  >
                     <Add />
                  </Fab>
               </Tooltip>
            </Link>

         </Box>
      </React.Fragment>
   );
};


export default FormList;
