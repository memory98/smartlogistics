import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
const Modal4SearchBar = ({ callback,seDate }) => {
  const [searchKw, setSearchKw] = useState({
    rcode: '',
    bname: '',
    startdt: '',
    enddt: '',
  });

  const refForm = useRef(null);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchKw((prev) => ({ ...prev, [name]: value }));
  };

  const handleAcceptStart = (date) => {
    setSearchKw({ ...searchKw, startdt: date });
  };
  const handleAcceptEnd = (date) => {
    setSearchKw({ ...searchKw, enddt: date });
  };
  const submit = (e) => {
    e.preventDefault();
    console.log(searchKw);
    //    setLoading(true);
    // setScrollend(false);
    callback(searchKw, 'search');
    setSearchKw({ ...searchKw, rcode: '', bname: '' });
  };

  useEffect(() => {
    return () => {};
  }, [searchKw]);

  return (
    <Grid 
      item 
      xs={12}
      md={12}
      style={{ height: '10%' }}
    >
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <span
        style={{
          fontSize: '23px',
          fontWeight: 800,
          marginBottom: '15px',
          textAlign: "center",
        }}
      >
        출고품목
      </span>
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
          width: '100%',
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
            value={searchKw.rcode}
          />
          <label style={{ fontSize: '0.9rem' }}>거래처</label>
          <TextField
            type="text"
            name="bname"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchKw.bname}
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
                    height: 30,
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
                value={searchKw.startdt === '' ? dayjs().subtract(6, 'day') : dayjs(searchKw.startdt)}
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
                    height: 30,
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
                minDate={searchKw.startdt || dayjs().subtract(6, 'day')}
                onAccept={handleAcceptEnd}
                value={searchKw.enddt === '' ? dayjs().add(6, 'day') : dayjs(searchKw.enddt)}
              ></DatePicker>
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Button type="submit" variant="outlined">
          <SearchIcon />
        </Button>
      </FormControl>
    </Box>
    </Grid>
  );
};

export default Modal4SearchBar;
