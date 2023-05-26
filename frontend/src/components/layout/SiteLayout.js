import * as React from "react";
import Box from "@mui/material/Box";
import Navigation from "./Navigation";
import Container from "./Container";
const SiteLayout = ({ role, children, page, info }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        // minWidth: '1460px',
        minWidth: '1634px',
        height: "100%",
        display: "flex",
        backgroundColor: "#F6F6F6",
      }}
    >
      {/* <Header /> */}
      {/* {
        role === 'admin' ? null : <Navigation />
      } */}
      <Navigation role={role} page={page} />
      <Container children={children} info={info} />{" "}
      {/* 여기서 margin 0px를 하면 각각의 Component에서 안 건드려도 될 거 같은데여*/}
    </Box>
  );
};

export default SiteLayout;
