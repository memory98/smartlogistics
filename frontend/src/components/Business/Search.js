import { FormControl, TextField, Button, Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useRef, useState } from 'react';

function Search({ textHandleChanges }) {
  const refForm = useRef(null);
  return (
    <Grid
      item
      xs={12}
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
          거래처
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
            거래처를 조회할 수 있습니다.
          </span>
        </span>
      </Box>

      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',

          marginBottom: '5px',
        }}
        name="searchForm"
        component="form"
        ref={refForm}
        onSubmit={(e) => {
          e.preventDefault();
          textHandleChanges(e); // clear 하기
          refForm.current.reset();
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <label htmlFor="bid" style={{ fontSize: '0.9rem' }}>
            검색어
          </label>
          <TextField
            id="bid"
            name="code"
            type="text"
            size="small"
            sx={{ marginLeft: 2, marginRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
          />

          <label htmlFor="bphone" style={{ fontSize: '0.9rem' }}>
            연락처
          </label>
          <TextField
            id="bphone"
            name="phone"
            type="text"
            variant="outlined"
            size="small"
            sx={{ marginLeft: 2, marginRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
          />
        </Box>
        <Button type="submit" name="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
}

export default Search;
