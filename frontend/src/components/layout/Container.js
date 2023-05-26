import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";

const Container = ({ children, info }) => {
  return (
    <Box>
      <Box
        component="main"
        sx={{
          position: "absolute",
          width: "80%",

          marginLeft: "190px",
          marginRight: "100px",
          maxWidth: "100%",
        }}
      >
        <Header info={info} />
        {children}
      </Box>
    </Box>
  );
};

export default Container;
