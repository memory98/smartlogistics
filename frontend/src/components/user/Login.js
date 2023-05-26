import React, { useRef, useState } from 'react';
import logo from '../../assets/img/logo.png';
import backImg from '../../assets/img/backimg.png';
import checkImg from '../../assets/img/checkblue.gif';
import sha256 from 'sha256';
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Input,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import styles from '../../assets/css/style.css';

const Login = ({ handleLogin }) => {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);

  // const handleRotate = () => {
  //   //setRotateY(rotateY + 90);
  //   setRotateX(rotateX + 90);
  // };

  const [isVisible, setIsVisible] = useState(false);
  const handleButtonClick = () => {
    setIsVisible(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(e);
  };

  const delayExecution = async (jwtToken, refreshToken, json) => {
    // 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 1500));

    handleLogin(jwtToken, refreshToken, json);
  };

  // user login
  const loginUser = async (event) => {
    const data = {
      id: document.getElementById('id').value,
      password: sha256(document.getElementById('password').value),
    };
    try {
      const response = await fetch('/api/sign/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      if (json.result !== 'success') {
        handleButtonClick();
        throw new Error(`${json.result} ${json.message}`);
      }

      if (json.data === null) {
        console.log('login failed....');
        alert('login failed....');
        return;
      }

      const jwtToken = response.headers.get('Authorization').replace('Bearer ', '');
      const refreshToken = response.headers.get('refresh');
      if (rotateX === 0) {
        setRotateX(rotateX + 90);
      }
      console.log(rotateX);
      delayExecution(jwtToken, refreshToken, json.data);
      // handleLogin(jwtToken, refreshToken, json.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          width: '350px',
          height: '500px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className={styles.container}>
          <div className={styles.cube} style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}>
            <div className={`${styles.face} ${styles.front}`}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  width: '322px',
                  height: '438px',
                }}
              >
                <Box component="img" src={logo} sx={{ height: '90px', width: '100px', marginTop: '30px' }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '22px',
                      color: '#117AEF',
                      fontFamily: 'sans-serif',
                      lineHeight: '90px',
                      fontWeight: 580,
                      pt: '5px',
                    }}
                  >
                    SMART
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '22px',
                      color: '#000',
                      fontFamily: 'sans-serif',
                      lineHeight: '90px',
                      fontWeight: 580,
                      pt: '5px',
                    }}
                  >
                    LOGISTRICS
                  </Typography>
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ margin: '0 40px' }}>
                  <TextField
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #fff inset',
                        WebkitTextFillColor: 'inherit',
                      },
                    }}
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    id="id"
                    name="id"
                    autoComplete="id"
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    sx={{
                      '& .MuiSvgIcon-root': { fontSize: '1.2rem' },
                      '& .MuiInputBase-input:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px #fff inset',
                        WebkitTextFillColor: 'inherit',
                      },
                    }}
                    size="small"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <KeyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    sx={{
                      fontSize: '12px',
                      color: 'red',
                      display: isVisible ? 'block' : 'none',
                    }}
                  >
                    아이디 또는 비밀번호가 일치하지 않습니다.
                  </Box>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 5, mb: 2 }}>
                    Sign In
                  </Button>
                </Box>
              </Box>
            </div>
            <div className={`${styles.face} ${styles.bottom}`}>
              <h2>Thank you</h2>
              <Box
                component="img"
                src={checkImg}
                sx={{
                  marginLetf: '3px',
                  width: '80px',
                  height: '80px',
                }}
              />
            </div>
            {/* <div className={`${styles.face} ${styles.back}`}>
              <h2>Back</h2>
            </div>
            <div className={`${styles.face} ${styles.left}`}>
              <h2>Left</h2>
            </div>
            <div className={`${styles.face} ${styles.right}`}>
              <h2>Right</h2>
            </div>
            <div className={`${styles.face} ${styles.top}`}>
              <h2>Thank You</h2>
            </div> */}
          </div>
        </div>
      </Box>
      <Box sx={{ marginLeft: '300px', marginTop: '-515px', position: 'relative', zIndex: 1 }}>
        <Box
          component="img"
          src={backImg}
          sx={{
            width: '500px',
            height: '550px',
          }}
        />
        <div style={{ width: '80%', position: 'absolute', top: '60%', left: '55%', transform: 'translate(-50%, -50%)' }}>
          <p style={{ marginBottom: '15px', fontSize: '1.2em', fontWeight: '700', color: 'white' }}>스마트 물류 시스템</p>
          <br></br>
          <p style={{ fontSize: '0.9em', color: 'white' }}>재고관리부터 입출고처리까지 원스탑으로 편리한 관리!</p>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
