import { Avatar, Box, Typography, Toolbar } from "@mui/material";
import styled from "styled-components";
import React from "react";
import Logo from "./Logo";
import img from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

// Toolbar 컴포넌트 재정의, makeStyles는 버전 문제로 패키지 다운이 안되서 styled 사용했음
const StyledToolbar = styled(Toolbar)`
  padding: 0px;
  height: 50px;
  display: flex;
  justify-content: space-between;
`;

const Header = ({ info }) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "8px",
        marginBottom: "20px",
        p: 0,
      }}
    >
      <Box
        sx={{
          padding: "0px",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          component="div"
          sx={{
            p: 0,
            // marginTop: '10px',
            // marginBottom: '20px',
            height: "80px",
            textAlign: "center",
            display: "flex",
            lineHeight: "80px",
            alignItems: "center",
          }}
        >
          <img src={img} width="50px" height="46px" alt="image" />
          <Box
            sx={{
              display: "block",
              float: "left",
              marginLeft: "5px",
            }}
          >
            <ListItemButton
              component={NavLink}
              to={"/"}
              sx={{
                float: "right",
                p: 0,
                marginRight: -1.5,
                bgcolor: 'transparent',
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&:active': {
                  backgroundColor: 'transparent', 
                },
              }}
            >
              <Logo />
            </ListItemButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          // onClick={() => (window.location.href = "/mypage")}
        >
          {/* <span style={{ backgroundImage: `url(${info.profile})` }}/> */}
          {/*<img src={info.profile} width="20px" height="20px" alt="img" /> */}{" "}
          {/* 이미지는 DB에 어떻게 저장되냐에 따라서 경로를 추가해주면 될듯 */}
          {info.user.jwt === "user" ? (
            <ListItemButton
              component={NavLink}
              to={"/mypage"}
              sx={{
                float: "right",
                p: 0,
                marginRight: -1.5,
              }}
            >
              <Avatar
                alt="img"
                src={localStorage.getItem("profile")}
                sx={{ marginRight: 1 }}
              />

              <Box sx={{ display: "flex" }}>
                <Box sx={{ fontWeight: "bold" }}>{info.name}</Box>
                <Box>님</Box>
              </Box>
            </ListItemButton>
          ) : undefined}
          {/* role을 보고 'admin'이면 name+관리자님 | 'user'이면 name+사용자님 */}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;