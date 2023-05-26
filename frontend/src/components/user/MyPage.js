import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import { customFetch } from '../custom/customFetch';
import MyData from './MyData';
import MyReceive from './MyReceive';
import MyRelease from './MyRelease';

const MyPage = ({ info, setUserInfo }) => {
  return (
    <Box sx={{ minWidth: '1460px' }}>
      <Grid container sx={{ width: '101%', marginLeft: '0px' }}>
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              marginBottom: 3,
              backgroundColor: '#FFF',
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
              height: '100px',
              marginTop: -2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '30px',
                marginTop: '6px',
                padding: '16px 0 0 16px',
              }}
            >
              <span
                style={{
                  fontSize: '23px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                마이페이지
              </span>

              <span
                style={{
                  backgroundColor: '#EBF2FF',
                  padding: '2px 5px 4.5px 0',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '9px',
                    marginLeft: '8px',
                  }}
                >
                  사용자 정보를 조회 및 수정할 수 있습니다.
                </span>
              </span>
            </Box>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            float: 'right',
            marginBottom: 3,
            backgroundColor: '#FFF',
            borderRadius: '8px',
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            height: '730px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              marginLeft: '100px',
              marginTop: '30px',
            }}
          >
            나의정보
          </span>
          <MyData info={info} setUserInfo={setUserInfo} />
          <Box sx={{ marginLeft: '30px' }}>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 800,
                marginTop: '30px',
                marginLeft: '80px',
              }}
            >
              나의활동
            </span>
            <Box sx={{ display: 'flex', width: '100%', marginTop: 2 }}>
              <MyReceive info={info} />
              <MyRelease info={info} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPage;
