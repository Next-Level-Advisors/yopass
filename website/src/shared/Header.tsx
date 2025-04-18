import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  return (
    <AppBar position="static" color="transparent" sx={{ marginBottom: 0, boxShadow: 'none' }}>
      <Toolbar>
        {/* DRIVE Logo on left */}
        <Box component="img" src="/DRIVE Logo.png" alt="DRIVE" height="70px" />
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Yopass logo on right */}
        <Box component="img" src="/Yopass-logo.png" alt="Yopass" height="100px" />
      </Toolbar>
    </AppBar>
  );
};
