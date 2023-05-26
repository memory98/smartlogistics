import { Button, FormControl, TextField, Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 아이콘을 넣기 위한 import
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const UserSerchBar = ({
  callback,
  searchTextFiled,
  changeHandler,
  changeSearchKwdEvent,
}) => {
  // useEffect(() => {
  //   //callback(searchKw);
  //   return () => {};
  // }, [searchTextFiled]);

  return (
    <Grid
      item
      xs={12}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: 3,
        backgroundColor: "#FFF",
        borderRadius: "8px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
        height: "100px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "30px",
          marginTop: "6px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            fontSize: "23px",
            fontWeight: 800,
            marginRight: "15px",
          }}
        >
          관리자
        </span>

        <span
          style={{
            backgroundColor: "#EBF2FF",
            padding: "2px 5px 4.5px 0",
          }}
        >
          <span
            style={{
              color: "gray",
              fontSize: "9px",
              marginLeft: "8px",
            }}
          >
            사용자를 조회할 수 있습니다.
          </span>
        </span>
      </Box>
      <FormControl
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          changeSearchKwdEvent();
          callback();
        }}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label sx={{ fontSize: "0.5rem" }}>검색어</label>
          <TextField
            type="text"
            name="ukeywd"
            onChange={changeHandler}
            size="small"
            sx={{ marginLeft: 2, marginRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.ukeywd}
          />
          <label sx={{ fontSize: "0.5rem" }}>연락처</label>
          <TextField
            type="text"
            name="uphone"
            onChange={changeHandler}
            size="small"
            sx={{ marginLeft: 2, marginRight: 5 }}
            InputProps={{ sx: { height: 30, width: 150 } }}
            value={searchTextFiled.uphone}
          />
        </Box>
        <Button type="submit" variant="outlined" sx={{ marginRight: 6 }}>
          <SearchIcon />
        </Button>
      </FormControl>
    </Grid>
  );
};

export default UserSerchBar;
