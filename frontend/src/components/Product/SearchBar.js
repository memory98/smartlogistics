import { Button, FormControl, TextField, Box, Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SerchBar = ({ callback, searchKw }) => {
  const [searchTextFiled, setSearchTextFiled] = useState({ pkeywd: '', psize: '' });
  const refForm = useRef(null);
  const changeHandler = (e) => {
    const { value, name } = e.target;
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    //callback(searchKw);
    return () => {};
  }, [searchKw]);

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
          품목
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
            품목을 조회할 수 있습니다.
          </span>
        </span>
      </Box>

      <FormControl
        component="form"
        ref={refForm}
        onSubmit={(e) => {
          e.preventDefault();
          searchKw.current = searchTextFiled;
          callback('search');
          setSearchTextFiled({ pkeywd: '', psize: '' });
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
          <label style={{ fontSize: '0.9rem' }}>검색어</label>
          <TextField
            type="text"
            name="pkeywd"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.pkeywd}
          />
          <label style={{ fontSize: '0.9rem' }}>규격</label>
          <TextField
            type="text"
            name="psize"
            onChange={changeHandler}
            size="small"
            sx={{ paddingLeft: 2, paddingRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.psize}
          />
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
};

export default SerchBar;
