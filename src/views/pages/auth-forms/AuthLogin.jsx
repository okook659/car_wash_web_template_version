import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Button, Checkbox, FormControl, FormControlLabel,
  Grid, IconButton, InputAdornment, InputLabel,
  OutlinedInput, Typography, Box
} from '@mui/material';

import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function AuthLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      const token = response.data.token;
      const role = response.data.user.role;

      localStorage.setItem('token', token);

      localStorage.setItem('role', role);


      if (role === 'laveur') {
        navigate('/laveur');
      } else if (role === 'admin') {
        navigate('/dashboard/default');
      } else {
        navigate('/dashboard/default');
      }

    } catch (err) {
      console.error(err);
      setError("Nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Nom d'utilisateur</InputLabel>
        <OutlinedInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Nom d'utilisateur"
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Mot de passe</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Mot de passe"
        />
      </FormControl>

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
        label="Rester connecté"
      />

      {error && <Typography color="error">{error}</Typography>}

      <Box mt={2}>
        <Button type="submit" variant="contained" fullWidth color="secondary">
          Se connecter
        </Button>
      </Box>
    </form>
  );
}
