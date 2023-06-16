import { Box, Button, Grid } from '@mui/material';
import checkImg from "../../assets/img/checkmark.png";
import React, { useState } from 'react';
import DayGraph from './DayGraph';
import DateGraph from './DateGraph';
import DateController from './DateController';

const Graph = () => {
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
      <Box sx={{ paddingLeft: 3, width: "94%" }}>
        <Box 
          sx={{ 
            display: 'flex'
            }}>
          <Box
            component="img"
            src={checkImg}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
          <span
            style={{
              position: "relative",
              fontSize: "16px",
              fontWeight: 800,
              marginRight: "15px",
              marginTop: "5px",
              marginLeft: "10px",
            }}
          >
            현황그래프
          </span>
        </Box>

        <DateGraph inquiry={true} page={'inquiry'} />
      </Box>
    </Grid >
  );
};

export default Graph;