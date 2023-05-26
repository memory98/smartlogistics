import {
  Box,
  Grid,
  NativeSelect,
} from "@mui/material";
import React, { useEffect, useRef, useState } from 'react';
import checkImg from "../../assets/img/checkmark.png";
import StockTable from "./StockTable";

const List = ({
  list,
  setList,
  searchKw,
  loading,
  searchKeyword,
}) => {
  const selectSt = useRef('ALL');
  const [a,setA] =useState(0);
  const handleSelect = (e) => {
    console.log(e.target.value);
    selectSt.current = e.target.value;
    setA(a+1);
    searchKw.current = ({...searchKw.current,st: selectSt.current});
    console.log(searchKw.current);

  }

  useEffect(()=> {
    console.log('ㅋㅋㅋㅋ')
    searchKeyword('search');
    
  },[a])
  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        height: 720,
        paddingTop: 2,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        marginBottom: 1.8,
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ display: 'flex', paddingLeft: 5, width: "94%",   justifyContent: 'space-between'
 }}>
        <Box sx={{display: 'flex'}}>
        <Box
          component="img"
          src={checkImg}
          sx={{
            width: "30px",
            height: "30px",
            marginRight: 1
          }}
        />
        <span
          style={{
            fontSize: "16px",
            fontWeight: 800,
            lineHeight: '30px'
          }}
        >
          현황리스트
        </span>
        </Box>
        <NativeSelect
          sx={{
            width: 60,
            marginBottom: 0.5
          }}
          defaultValue={30}
          inputProps={{
            name: 'unit',
            id: 'uncontrolled-native',
          }}
          onChange={handleSelect}
        >
          <option value={'ALL'}>ALL</option>
          <option value={'RV'}>입고</option>
          <option value={'IS'}>출고</option>
        </NativeSelect>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: "column",
          width: "100%",
        }}
      >

        <StockTable list={list} searchKw={searchKw} searchKeyword={searchKeyword} loading={loading} />
      </Box>
    </Grid>
  );
};

export default List;