import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import {
   Box,
   AppBar,
   Toolbar,

   Avatar,
   Button,
   MenuItem,
   ListItemIcon,
   ListItemText,
   ClickAwayListener,
   Grow,
   Popper,
   Paper,
   MenuList
} from '@material-ui/core';
import { Person, ExitToApp } from '@material-ui/icons';

import { useAuth } from '../hooks/auth';


interface IHeader {
   avatar_url: string;
}

const Header: React.FC<IHeader> = ({ avatar_url }) => {
   const { signOut } = useAuth();

   const [open, setOpen] = useState(false);
   const anchorRef = useRef<HTMLButtonElement>(null);

   const handleClose = (event: React.MouseEvent<EventTarget>) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
         return;
      }

      setOpen(false);
   };

   const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
   };

   return (
      <React.Fragment>
         <AppBar 
            color="inherit" 
            style={{ 
               boxShadow: 'none'
               // boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px' 
            }}
         >
            <Toolbar>
               <Box
                  display="flex"
                  flexGrow={1}
                  justifyContent="space-between"
                  alignItems="center"
               >
                  <Link to="/">
                     <img
                        src=""
                        alt="Logo"
                     />
                  </Link>

                  <Box>
                     <Button ref={anchorRef} onClick={handleToggle}>
                        <Avatar src={avatar_url} alt="" />
                     </Button>

                     <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        transition
                        disablePortal
                     >
                        {({ TransitionProps, placement }) => (
                           <Grow
                              {...TransitionProps}
                              style={{
                                 transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                              }}
                           >
                              <Paper>
                                 <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow">
                                       <MenuItem>
                                          <Link to="/profile">
                                             <Box display="flex" alignItems="center">
                                                <ListItemIcon style={{ minWidth: 40 }}>
                                                   <Person fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Perfil" />
                                             </Box>
                                          </Link>
                                       </MenuItem>

                                       <MenuItem onClick={signOut}>
                                          <ListItemIcon style={{ minWidth: 40 }}>
                                             <ExitToApp fontSize="small" />
                                          </ListItemIcon>
                                          <ListItemText primary="Sair" />
                                       </MenuItem>
                                    </MenuList>
                                 </ClickAwayListener>
                              </Paper>
                           </Grow>
                        )}
                     </Popper>
                  </Box>
               </Box>
            </Toolbar>
         </AppBar>
         <Toolbar />
      </React.Fragment>
   )
};


export default Header;
