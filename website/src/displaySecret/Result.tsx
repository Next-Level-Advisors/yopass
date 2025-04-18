import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCopyToClipboard } from 'react-use';
import {
  Button,
  Typography,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type ResultProps = {
  readonly uuid: string;
  readonly password: string;
  readonly prefix: 's' | 'f';
  readonly customPassword?: boolean;
};

const Result = ({ uuid, password, prefix }: ResultProps) => {
  const base =
    (process.env.PUBLIC_URL ||
      `${window.location.protocol}//${window.location.host}`) + `/#/${prefix}`;
  const fullLink = `${base}/${uuid}/${password}`;
  const { t } = useTranslation();
  const [copy, copyToClipboard] = useCopyToClipboard();
  
  const handleCopy = () => {
    copyToClipboard(fullLink);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <Typography variant="h4" align="center" sx={{ mb: 8, color: 'white' }}>
        Secret Stored in Database
      </Typography>
      
      <Paper sx={{ 
        p: 4, 
        width: '100%', 
        maxWidth: '600px', 
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 8
      }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCopy}
              startIcon={<FontAwesomeIcon icon={faCopy} />}
              sx={{ mr: 2 }}
            >
              Copy to Clipboard
            </Button>
          </Grid>
          
          <Grid item xs>
            <Typography 
              variant="body1" 
              sx={{ 
                wordBreak: 'break-all',
                color: copy.error ? 'error.main' : 'text.primary' 
              }}
            >
              {fullLink}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ 
          py: 1.5, 
          px: 4, 
          borderRadius: '50px',
          fontSize: '1.1rem'
        }}
      >
        Encrypt Another Message
      </Button>
    </Box>
  );
};

export default Result;
