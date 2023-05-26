import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
const SerchBar = ({ callback, searchKw }) => {
  const [searchTextFiled, setSearchTextFiled] = useState({
    rcode: '',
    bname: '',
    startdt: '',
    enddt: '',
  });

  const refForm = useRef(null);

  const changeHandler = (e) => {
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
    console.log(searchTextFiled);
    //    setLoading(true);
    // setScrollend(false);
    searchKw.current = searchTextFiled;
    callback('search');
    setSearchTextFiled({ ...searchTextFiled, rcode: '', bname: '' });
  };

  // useEffect(() => {
  //   return () => {};
  // }, [searchKw]);

  return (
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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
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
          입고
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
            입고를 조회할 수 있습니다.
          </span>
        </span>
      </Box>

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
          <label style={{ fontSize: '0.9rem' }}>입고코드</label>
          <TextField
            type="text"
            name="rcode"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.rcode}
          />
          <label style={{ fontSize: '0.9rem' }}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.bname}
          />
          <label style={{ fontSize: '0.9rem' }}>기간</label>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ height: '60px' }}>
            <DemoContainer
              components={['DatePicker']}
              sx={{
                p: 0,
                minWidth: 0,
                '& .css-1xhypcz-MuiStack-root': {
                  padding: 0,
                },
              }}
            >
              <DatePicker
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: 'small', style: { minWidth: 'unset' } },
                }}
                sx={{
                  minWidth: 0,
                  paddingLeft: 2,
                  overflow: 'hidden',
                  '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: 0,
                    height: '1em',
                    width: 105,
                    marginLeft: '10px',
                  },
                  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                    width: '165px',
                  },
                  '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    height: '35px',
                  },
                }}
                onAccept={handleAcceptStart}
                value={searchTextFiled.startdt === '' ? dayjs().subtract(6, 'day') : dayjs(searchTextFiled.startdt)}
              ></DatePicker>
              <span>~</span>
              <DatePicker
                style={{
                  '& .css-3tvb69-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    backgroundColor: '#333',
                  },
                }}
                format="YYYY-MM-DD"
                slotProps={{
                  textField: { size: 'small' },
                }}
                sx={{
                  minWidth: 0,
                  paddingRight: 5,
                  overflow: 'hidden',
                  '& .css-19qh8xo-MuiInputBase-input-MuiOutlinedInput-input': {
                    padding: 0,
                    height: '1em',
                    width: 105,
                    marginLeft: '10px',
                  },
                  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                    width: '165px',
                  },
                  '& .css-e1omjc-MuiStack-root>.MuiTextField-root': {
                    minWidth: 0,
                    height: '35px',
                  },
                }}
                minDate={searchTextFiled.startdt || dayjs().subtract(6, 'day')}
                onAccept={handleAcceptEnd}
                value={searchTextFiled.enddt === '' ? dayjs().add(6, 'day') : dayjs(searchTextFiled.enddt)}
              ></DatePicker>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
};

export default SerchBar;
