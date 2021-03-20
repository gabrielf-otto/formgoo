import React from 'react';
import { 
   Container, 
   Box, 
   Grid, 
   Paper, 
   Card, 
   TextField, 
   FormControlLabel, 
   Checkbox, 
   Button, 
   Link, 
   Typography
} from '@material-ui/core';


const SignIn: React.FC = () => {


   return (
      <Box height='100vh' display="flex" alignItems="center">
         <Grid container>
            <Grid item xs={12}>
               <Box maxWidth={400} mx="auto">
                  <Paper>
                     <Box p={2}>
                        <Typography variant="h4">Sign in</Typography>

                        <form autoComplete="off">
                           <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Email"
                              name="email"
                              autoComplete="email"
                              autoFocus
                           />
                           <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="Senha"
                              type="password"
                              id="password"
                              autoComplete="password"
                           />
                           <Grid xs={12}>
                              <Link href="#" variant="body2">
                                 Esqueceu a senha?
                              </Link>
                           </Grid>
                           <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              style={{margin: '30px 20px 30px 20px'}}
                           >
                              Entrar
                           </Button>
                           <Grid container>
                              <Grid item>
                                 <Link href="#" variant="body2">
                                    {"Não tem uma conta? Registre-se"}
                                 </Link>
                              </Grid>
                           </Grid>
                        </form>
                     </Box>
                  </Paper>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};


export default SignIn;
