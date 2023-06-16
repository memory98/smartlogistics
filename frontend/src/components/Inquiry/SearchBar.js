import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import dayjs from 'dayjs';

const SearchBar = ({ state, setState, searchKeyword, searchKw }) => {
  const [searchTextFiled, setSearchTextFiled] = useState({
    startdt: '',
    enddt: '',
    user_name: '',
    business_name: '',
    code: '',
    st: searchKw.current.st
  });
  const refForm = useRef(null);

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setSearchTextFiled({ ...searchTextFiled, startdt: date });
  };

  const handleAcceptEnd = (date) => {
    setSearchTextFiled({ ...searchTextFiled, enddt: date });
  };

  const submit = (e) => {
    e.preventDefault();
    searchKw.current = ({ ...searchTextFiled, st: searchKw.current.st });
    searchKeyword('search');
    setSearchTextFiled({ ...searchTextFiled, user_name: '', business_name: '', code: '' });
  };

  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: -2,
        marginBottom: 3,
        backgroundColor: '#FFF',
        borderRadius: '8px',
        boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)',
        height: '100px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: '16px 0 0 16px',
            marginLeft: '30px',
            marginTop: '6px',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '23px',
              fontWeight: 800,
              marginRight: '15px',
            }}
          >
            현황 조회
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
              현황 조회를 조회할 수 있습니다.
            </span>
          </span>
        </Box>
        <Box
          sx={{
            display: 'flex',
            height: 20,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 6
          }}>
          <Button
            sx={{
              width: '20px',
              bgcolor: state ? '#0671F7' : '#E7E6E6',
              color: state ? '#fff' : '#000',
              borderRadius: '20px 0 0 20px',
              ':hover': {
                bgcolor: state ? '#0671F7' : '#E7E6E6',
              }
            }}
            onClick={(e) => {
              setState(true);
              searchKw.current = ({ user_name: '', business_name: '', code: '', startdt: '', enddt: '', st: 'ALL' });
            }}
          >
            <FormatListBulletedIcon sx={{ fontSize: 20 }} />
          </Button>
          <Button
            sx={{
              width: '20px',
              bgcolor: state ? '#E7E6E6' : '#0671F7',
              color: state ? '#000' : '#fff',
              borderRadius: '0 20px 20px 0',
              ':hover': {
                bgcolor: state ? '#E7E6E6' : '#0671F7',
              }
            }}
            onClick={e => setState(false)}
          >
            <LeaderboardIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      </Box>

      {
        state ?
          <FormControl
            component="form"
            ref={refForm}
            onSubmit={(e) => {
              submit(e);
            }}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: '5px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >

              <label style={{ fontSize: '0.9rem' }}>
                담당자</label>
              <TextField
                type='text'
                name='user_name'
                onChange={onChangeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
                value={searchTextFiled.user_name}
              />
              <label style={{ fontSize: '0.9rem' }}>
                거래처</label>
              <TextField
                type='text'
                name='business_name'
                onChange={onChangeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
                value={searchTextFiled.business_name}

              />
              <label style={{ fontSize: '0.9rem' }}>
                코드</label>
              <TextField
                type='text'
                name='code'
                onChange={onChangeHandler}
                size='small'
                sx={{ paddingLeft: 2, paddingRight: 5 }}
                InputProps={{ sx: { height: 30, width: 150 } }}
                value={searchTextFiled.code}
              />
              <label style={{ fontSize: '0.9rem' }}>
                기간</label>
                <LocalizationProvider
            dateAdapter={AdapterDayjs}
            sx={{ height: "60px" }}
          >
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                p: 0,
                minWidth: 0,
                "& .MuiStack-root": {
                  padding: 0,
                },
              }}
            >
              <DatePicker
                maxDate={searchTextFiled.enddt || dayjs().subtract(-6, "day")}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: "small", style: { minWidth: "unset" } },
                }}
                sx={{
                  minWidth: 0,
                  paddingLeft: 2,
                  overflow: "hidden",
                  "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd":
                    {
                      padding: 0,
                      height: "1em",
                      width: 105,
                      marginLeft: "10px",
                    },
                  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedEnd":
                    {
                      width: "165px",
                      height: "30px",
                    },
                }}
                onAccept={handleAcceptStart}
                value={
                  searchTextFiled.startdt === ""
                    ? dayjs().subtract(6, "day")
                    : dayjs(searchTextFiled.startdt)
                }
              ></DatePicker>
              <span style={{ alignSelf: "center" }}>~</span>
              <DatePicker
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: "small" },
                }}
                sx={{
                  minWidth: 0,
                  paddingRight: 5,
                  overflow: 'hidden',
                  "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.MuiInputBase-inputAdornedEnd":
                    {
                      padding: 0,
                      height: "1em",
                      width: 105,
                      marginLeft: "10px",
                    },
                  "& .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-sizeSmall.MuiInputBase-adornedEnd":
                    {
                      width: "165px",
                      height: "30px",
                    },
                }}
                minDate={searchTextFiled.startdt || dayjs().subtract(6, "day")}
                onAccept={handleAcceptEnd}
                value={
                  searchTextFiled.enddt === ""
                    ? dayjs().add(6, "day")
                    : dayjs(searchTextFiled.enddt)
                }
              ></DatePicker>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Button type='submit' variant='outlined' sx={{ marginRight: 6 }}>
              <SearchIcon />
            </Button>
          </FormControl>
          :
          <></>
      }
    </Grid>
  );
};

export default SearchBar;