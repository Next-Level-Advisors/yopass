import { useTranslation } from 'react-i18next';
import { useForm, Controller, Control } from 'react-hook-form';
import randomString, {
  encryptMessage,
  isErrorWithMessage,
  postSecret,
} from '../utils/utils';
import { useState } from 'react';
import Result from '../displaySecret/Result';
import Error from '../shared/Error';
import Expiration from '../shared/Expiration';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
  Button,
  Grid,
  Box,
  InputLabel,
  Paper,
  Radio,
  RadioGroup,
  Divider,
} from '@mui/material';

// Template options
const TEMPLATES = {
  "Username/Password": `Website:
Username:
Password:`,
  "Credit Card": `Card Type (Visa/MC/Etc.):
Name on Card:
Card Number:
Expiration (MM/YY)
CVV:
Zip Code:`,
};

const CreateSecret = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm({
    defaultValues: {
      generateDecryptionKey: true,
      secret: '',
      onetime: true,
      template: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    password: '',
    uuid: '',
    customPassword: false,
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.ctrlKey && event.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = async (form: any): Promise<void> => {
    if (!form.secret) {
      return;
    }
    // Use the manually entered password, or generate one
    const pw = form.password ? form.password : randomString();
    setLoading(true);
    try {
      const { data, status } = await postSecret({
        expiration: parseInt(form.expiration),
        message: await encryptMessage(form.secret, pw),
        one_time: form.onetime,
      });

      if (status !== 200) {
        setError('secret', { type: 'submit', message: data.message });
      } else {
        setResult({
          customPassword: form.password ? true : false,
          password: pw,
          uuid: data.message,
        });
      }
    } catch (e) {
      if (isErrorWithMessage(e)) {
        setError('secret', {
          type: 'submit',
          message: e.message,
        });
      }
    }
    setLoading(false);
  };

  const handleTemplateChange = (template: string) => {
    setValue('secret', TEMPLATES[template] || '');
  };

  if (result.uuid) {
    return (
      <Result
        password={result.password}
        uuid={result.uuid}
        prefix="s"
        customPassword={result.customPassword}
      />
    );
  }

  return (
    <>
      <Error
        message={errors.secret?.message}
        onClick={() => clearErrors('secret')}
      />

      <Typography variant="h4" align="center" sx={{ color: 'white', mt: 2, mb: 2 }}>
        DRIVE Secure | Next Level DRIVE
      </Typography>
      
      <Typography align="center" sx={{ color: 'white', mb: 4 }}>
        How It Works
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography sx={{ color: 'white', mb: 1 }}>
            1. Add your sensitive information in the box below
          </Typography>
          <Typography sx={{ color: 'white', mb: 1 }}>
            2. Determine when you want the information to be automatically deleted
          </Typography>
          <Typography sx={{ color: 'white', mb: 3 }}>
            3. After clicking "Encrypt Message" the contents will be encrypted and you will be
            provided a link. Send that link to the recipient. Without the link, the information cannot
            be accessed. If the link is access or found after deletion, the message contents cannot
            be retrieved.
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Left side - Template selection */}
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 2, 
                height: '100%', 
                backgroundColor: 'background.paper',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h6" color="secondary" gutterBottom>
                Load Template
              </Typography>
              
              <Controller
                name="template"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTemplateChange(e.target.value);
                    }}
                  >
                    <FormControlLabel 
                      value="Username/Password" 
                      control={<Radio color="secondary" />} 
                      label="Username/Password" 
                    />
                    <FormControlLabel 
                      value="Credit Card" 
                      control={<Radio color="secondary" />} 
                      label="Credit Card" 
                    />
                  </RadioGroup>
                )}
              />
            </Paper>
          </Grid>

          {/* Right side - Text input and options */}
          <Grid item xs={12} md={9}>
            <Controller
              name="secret"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  fullWidth
                  margin="dense"
                  rows="12"
                  autoFocus
                  onKeyDown={onKeyDown}
                  placeholder={t('create.inputSecretPlaceholder')}
                  sx={{ mb: 2, backgroundColor: 'background.paper' }}
                  slotProps={{
                    htmlInput: { spellCheck: 'false', 'data-gramm': 'false' },
                  }}
                />
              )}
            />

            <Box sx={{ mb: 2, color: '#4d9be3' }}>
              <Typography>Delete Message After:</Typography>
              <Controller
                name="expiration"
                control={control}
                defaultValue="3600"
                render={({ field }) => (
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="3600"
                      control={<Radio />}
                      label="1 Hour"
                    />
                    <FormControlLabel
                      value="86400"
                      control={<Radio />}
                      label="1 Day"
                    />
                    <FormControlLabel
                      value="604800"
                      control={<Radio />}
                      label="1 Week"
                    />
                  </RadioGroup>
                )}
              />
            </Box>

            <Box sx={{ mb: 2, color: '#4d9be3' }}>
              <FormControlLabel
                control={
                  <Controller
                    name="onetime"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        id="enable-onetime"
                        defaultChecked
                        color="primary"
                      />
                    )}
                  />
                }
                label="One-Time Download: Yes (Message can be opened once and is then deleted)"
              />
            </Box>

            {/* Hidden but still active generate decryption key */}
            <Box sx={{ display: 'none' }}>
              <Controller
                name="generateDecryptionKey"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} defaultChecked color="primary" />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                onClick={() => handleSubmit(onSubmit)()}
                variant="contained"
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  px: 4, 
                  borderRadius: '50px',
                  fontSize: '1.1rem'
                }}
              >
                {loading ? t('create.buttonEncryptLoading') : 'Encrypt Message'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default CreateSecret;
