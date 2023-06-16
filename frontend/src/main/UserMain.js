import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { Box, Button, FormControl, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Donut from '../components/chart/Donut';
import { customFetch } from '../components/custom/customFetch';
import DateGraph from '../components/Inquiry/DateGraph';
import jwt_decode from 'jwt-decode';
import hello from '../assets/img/helloman.png';
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

const UserMain = ({ info }) => {
  const [receive, setReceive] = useState({});
  const [release, setRelease] = useState({});
  const getReceiveData = async (data) => {
    await customFetch(`/api/receive/mystatistics?u=${data.sub}`, {
      method: 'get',
    }).then((json) => {
      setReceive(json.data);
      console.log(json.data);
    });
  };

  const getReleaseData = async (data) => {
    await customFetch(`/api/release/mystatistics?u=${data.sub}`, {
      method: 'get',
    }).then((json) => {
      setRelease(json.data);
      console.log(json.data);
    });
  };
  useEffect(() => {
    const data = info.user || jwt_decode(localStorage.getItem('token'));
    console.log('data출력');
    console.log(data);
    getReceiveData(data);
    getReleaseData(data);
    return () => {};
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: 'column',
          marginBottom: 2,
          marginLeft: '0px',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              height: '15%',
              alignItems: 'center',
              marginRight: '1%',
              marginBottom: '1%',
            }}
          >
            <Typography
              sx={{
                fontSize: '23px',
                fontWeight: 800,
                marginRight: '15px',
              }}
            >

              <Box sx={{ display: 'flex' }}>
                {`안녕하세요  ${info.name}님 `}
                <Box component="img" src={hello} sx={{ paddingLeft: '15px', width: '40px' }} />
              </Box>

            </Typography>
            <span
              style={{
                marginTop: 1,
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
                즐거운 하루되세요! 대시보드를 클릭하여 원하는 작업을 할 수 있습니다.
              </span>
            </span>
          </Box>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            marginTop: '1%',
          }}
        >
          <Grid
            item
            xs={2.9}
            md={2.9}
            sx={{
              height: '250px',
              backgroundColor: '#FAF6EE',
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
              marginRight: 2.7,
            }}
          >
            <Box sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: 800,
                    marginRight: '15px',
                  }}
                >
                  <Box>입고</Box>
                </Typography>{' '}
              </Box>

              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                <Box
                  sx={{
                    color: 'gray',
                  }}
                >
                  가장 오래된,가장 최근의 입고
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: '#fff',
                  height: '150px',
                  marginTop: '3%',
                  borderRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    borderBottom: '1px solid #D9D9D9',
                    paddingBottom: '10px',
                    width: '90%',
                    paddingTop: '5%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>가장 최근 입고</Box>
                  <Box>
                    {receive.latestCode ? (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '20px',
                          marginTop: '1%',
                          marginRight: '10%',
                        }}
                      >
                        {receive.latestCode}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '10px',
                          marginTop: '5%',
                          marginRight: '10%',
                          color: 'gray',
                        }}
                      >
                        존재하는 내역이 없습니다
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    width: '90%',
                    paddingTop: '3%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>가장 오래된 입고</Box>
                  <Box>
                    {receive.oldestCode ? (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '20px',
                          marginTop: '3%',
                          marginRight: '10%',
                        }}
                      >
                        {receive.oldestCode}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '10px',
                          marginTop: '6%',
                          marginRight: '10%',
                          color: 'gray',
                        }}
                      >
                        존재하는 내역이 없습니다
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.9}
            md={2.9}
            sx={{
              height: '250px',
              backgroundColor: '#F1F1F7',
              marginRight: 2.7,
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: 800,
                    marginRight: '15px',
                  }}
                >
                  <Box>출고</Box>
                </Typography>{' '}
              </Box>

              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                <Box
                  sx={{
                    color: 'gray',
                  }}
                >
                  가장 오래된,가장 최근의 출고
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: '#fff',
                  height: '150px',
                  marginTop: '3%',
                  borderRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    borderBottom: '1px solid #D9D9D9',
                    paddingBottom: '10px',
                    width: '90%',
                    paddingTop: '5%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>가장 최근 출고</Box>
                  <Box>
                    {release.latestCode ? (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '20px',
                          marginTop: '1%',
                          marginRight: '10%',
                        }}
                      >
                        {release.latestCode}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '10px',
                          marginTop: '5%',
                          marginRight: '10%',
                          color: 'gray',
                        }}
                      >
                        존재하는 내역이 없습니다.
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    width: '90%',
                    paddingTop: '3%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>가장 오래된 출고</Box>
                  <Box>
                    {release.oldestCode ? (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '20px',
                          marginTop: '3%',
                          marginRight: '10%',
                        }}
                      >
                        {release.oldestCode}
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          textAlign: 'end',
                          fontSize: '10px',
                          marginTop: '6%',
                          marginRight: '10%',
                          color: 'gray',
                        }}
                      >
                        존재하는 내역이 없습니다.
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.9}
            md={2.9}
            sx={{
              height: '250px',
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#FAF3F3',
              marginRight: 2.7,
            }}
          >
            <Box sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: 800,
                    marginRight: '15px',
                  }}
                >
                  <Box>입고 현황</Box>
                </Typography>
                <Box>
                  <ListItemButton
                    component={NavLink}
                    to={"/receive"}
                    sx={{
                      padding: 0,
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    <Box sx={{ color: 'gray' }}>자세히</Box>
                  </ListItemButton>
                </Box>
              </Box>

              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                <Box
                  sx={{
                    color: 'gray',
                  }}
                >
                  내가 담당하고 있는 입고 내역
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: '#fff',
                  height: '150px',
                  marginTop: '3%',
                  borderRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    borderBottom: '1px solid #D9D9D9',
                    paddingBottom: '10px',
                    width: '90%',
                    paddingTop: '5%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>금일 입고 건수</Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        marginRight: '10%',
                        textAlign: 'end',
                      }}
                    >
                      {receive.todayCount || 0}건
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    width: '90%',
                    paddingTop: '3%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>누적 입고 건수</Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        marginRight: '10%',
                        textAlign: 'end',
                        marginTop: '2%',
                      }}
                    >
                      {receive.totalCount || 0}건
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={2.8}
            md={2.8}
            sx={{
              height: '250px',
              backgroundColor: '#ECF7FA',
              borderRadius: '8px',
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: 800,
                    marginRight: '15px',
                  }}
                >
                  <Box>출고 현황</Box>
                </Typography>
                <Box>
                  <ListItemButton
                    component={NavLink}
                    to={"/release"}
                    sx={{
                      padding: 0,
                      bgcolor: 'transparent',
                      '&:hover': {
                        bgcolor: 'transparent',
                      },
                    }}
                  >
                    <Box sx={{ color: 'gray' }}>자세히</Box>
                  </ListItemButton>
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                <Box
                  sx={{
                    color: 'gray',
                  }}
                >
                  내가 담당하고 있는 출고 내역
                </Box>
              </Typography>
              <Box
                sx={{
                  bgcolor: '#fff',
                  height: '150px',
                  marginTop: '3%',
                  borderRadius: '8px',
                }}
              >
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    borderBottom: '1px solid #D9D9D9',
                    paddingBottom: '10px',
                    width: '90%',
                    paddingTop: '5%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}> 금일 출고 건수</Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '25px',
                        marginRight: '10%',
                        textAlign: 'end',
                      }}
                    >
                      {release.todayCount || 0}건
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginLeft: '5%',
                    height: '30%',
                    width: '90%',
                    paddingTop: '3%',
                  }}
                >
                  <Box sx={{ fontSize: '15px' }}>누적 출고 건수</Box>
                  <Typography
                    sx={{
                      fontSize: '25px',
                      marginRight: '10%',
                      textAlign: 'end',
                      marginTop: '2%',
                    }}
                  >
                    {release.totalCount || 0}건
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          sx={{
            p: 2,
            marginTop: '1%',
            border: '1px solid #fff',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box
            sx={{
              height: '450px',
            }}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '23px',
                    fontWeight: 800,
                    marginRight: '15px',
                  }}
                >
                  <Box>일일 현황</Box>
                </Typography>
                <a style={{ textDecoration: 'none', marginLeft: 'auto' }} href="/inquiry">
                  <Box sx={{ color: 'gray' }}>자세히</Box>
                </a>
              </Box>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 800,
                  marginRight: '15px',
                }}
              >
                <Box
                  sx={{
                    color: 'gray',
                  }}
                >
                  입고 출고현황을 그래프로 나타내줍니다.
                </Box>
              </Typography>
              <DateGraph inquiry={false} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMain;