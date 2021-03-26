import React, { useCallback } from 'react';
import { 
   Box, 
   Grid, 
   TextField,  
   Button, 
   Link, 
   Typography
} from '@material-ui/core';


import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';



const schema = '';


const SignIn: React.FC = () => {
   const { register, handleSubmit, errors } = useForm({
      // resolver: yupResolver(schema)
   });

   const { signIn } = useAuth();
   const history = useHistory();


   const signInRequest = useCallback(async (data) => {
      try {
         console.log(data);
         await signIn(data);
         history.push('/');
      }
      catch (err) {
         console.log(err);
      }
   },
   [signIn]);


   return (
      <Box height='100vh' display="flex" alignItems="center">
         <Grid container>
            <Grid item xs={12}>
               <Box maxWidth={400} mx="auto">
                  <Box p={2}>
                  <Typography component="h1" variant="h5" align="center">
                     Login
                  </Typography>

                     <form onSubmit={handleSubmit(signInRequest)}>
                        <TextField
                           inputRef={register}
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           id="email"
                           label="Email"
                           name="email"
                           autoComplete="off"
                           autoFocus
                        />
                        <TextField
                           inputRef={register}
                           variant="outlined"
                           margin="normal"
                           fullWidth
                           name="password"
                           label="Senha"
                           type="password"
                           id="password"
                           autoComplete="off"
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
                           style={{margin: '30px 0'}}
                        >
                           Entrar
                        </Button>
                     </form>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};


export default SignIn;
