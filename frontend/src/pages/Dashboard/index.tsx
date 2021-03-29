import React, { useCallback, useEffect, useState } from 'react';
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
   Menu,
   ListItemIcon,
   ListItemText,

   Dialog,
   DialogTitle,
   DialogContent,
   DialogActions,
   Button,
   DialogContentText,
   ButtonGroup,
   Popover
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
import { useQueryParams } from '../../hooks/queryParams';


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

   actions: { 
      menuAnchorRef: HTMLElement | null;
      popoverAnchorRef: HTMLElement | null;
      isConfirmDeleteDialogOpened: boolean;
   }
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
            ),

            actions: {
               menuAnchorRef: null,
               popoverAnchorRef: null,
               isConfirmDeleteDialogOpened: false
            }
         }));

         setForms(forms);
      });
   },
   []);

   const openActionsMenu = useCallback((event, formRef) => 
   {
      const draft = forms;
      draft[formRef].actions.menuAnchorRef = event.currentTarget;
      setForms(draft);
   },
   [forms]);

   const closeActionsMenu = useCallback(formRef => 
   {
      const draft = forms;
      draft[formRef].actions.menuAnchorRef = null;
      setForms(draft);
   },
   [forms]);

   const openConfirmDeleteFormDialog = useCallback(formRef => 
   {
      const draft = forms;
      draft[formRef].actions.menuAnchorRef = null;
      draft[formRef].actions.isConfirmDeleteDialogOpened = true;
      setForms(draft);
   },
   [forms]);

   const closeConfirmDeleteFormDialog = useCallback(formRef => 
   {
      const draft = forms;
      draft[formRef].actions.isConfirmDeleteDialogOpened = false;
      setForms(draft);
   },
   [forms]);

   const openConfirmDeleteFormPopover = useCallback((event, formRef) => 
   {
      const draft = forms;
      draft[formRef].actions.popoverAnchorRef = event.currentTarget;
      setForms(draft);
   },
   [forms]);

   const closeConfirmDeleteFormPopover = useCallback(formRef => 
   {
      const draft = forms;
      draft[formRef].actions.popoverAnchorRef = null;
      setForms(draft);
   },
   [forms]);

   const deleteForm = useCallback(formRef => 
   {
      const draft = forms;
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
                  {viewMode === EViewMode.GRID? 
                  (
                     <Grid container spacing={2}>
                        {forms.map((form, formRef) => (
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

                                          <IconButton size="small" onClick={event => openActionsMenu(event, formRef)}>
                                             <MoreVert />
                                          </IconButton>

                                          <Menu
                                             keepMounted
                                             anchorEl={form.actions.menuAnchorRef}
                                             open={!!form.actions.menuAnchorRef}
                                             onClose={() => closeActionsMenu(formRef)}
                                          >
                                             <MenuItem onClick={() => closeActionsMenu(formRef)}>
                                                <Link to="">
                                                   <Box display="flex" alignItems="center">
                                                      <ListItemIcon style={{ minWidth: 40 }}>
                                                         <QuestionAnswer fontSize="small" />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Resoluções" />
                                                   </Box>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={() => closeActionsMenu(formRef)}>
                                                <Link to="">
                                                   <Box display="flex" alignItems="center">
                                                      <ListItemIcon style={{ minWidth: 40 }}>
                                                         <Edit fontSize="small" />
                                                      </ListItemIcon>
                                                      <ListItemText primary="Editar" />
                                                   </Box>
                                                </Link>
                                             </MenuItem>

                                             <MenuItem onClick={() => openConfirmDeleteFormDialog(formRef)}>
                                                <Box display="flex" alignItems="center">
                                                   <ListItemIcon style={{ minWidth: 40 }}>
                                                      <Delete fontSize="small" />
                                                   </ListItemIcon>
                                                   <ListItemText primary="Deletar" />
                                                </Box>
                                             </MenuItem>

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
                                 </FormCard>
                              </Link>
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
                                          <IconButton size="small" onClick={event => openConfirmDeleteFormPopover(event, formRef)}>
                                             <Delete fontSize="small" />
                                          </IconButton>
                                       </Tooltip>

                                       {/* <Popover
                                          anchorEl={form.actions.popoverAnchorRef}   
                                          open={!!form.actions.popoverAnchorRef}
                                          onClose={() => closeConfirmDeleteFormPopover(formRef)}

                                          anchorOrigin={{
                                             vertical: 'top',
                                             horizontal: 'center',
                                          }}
                                          transformOrigin={{
                                             vertical: 'bottom',
                                             horizontal: 'center',
                                          }}
                                       >
                                          <Box display="flex" flexDirection="column">
                                             <Typography>
                                                Tem certeza que deseja deletar o formulário?
                                             </Typography>

                                             <Divider />

                                             <ButtonGroup>
                                                <Button color="primary" onClick={() => closeConfirmDeleteFormPopover(formRef)}>
                                                   Cancelar
                                                </Button>
                                                <Button color="secondary" onClick={() => deleteForm(formRef)}>Confirmar</Button>
                                             </ButtonGroup>
                                          </Box>
                                       </Popover> */}
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


export default Dashboard;
