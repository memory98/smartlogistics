import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import StoreIcon from '@mui/icons-material/Store';
import InputIcon from '@mui/icons-material/Input';
import OutputIcon from '@mui/icons-material/Output';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const iconBoxSize = '148px';

const Menu = ({ children }) => {
  return (
    <Box
      sx={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        background: '#117AEF',
        color: '#000',
        p: 3
      }}>
      {children}
    </Box>
  )
}

const Icon = ({ url, text, children }) => {
  return (
    <Box sx={{
      width: iconBoxSize,
      height: iconBoxSize,
      p: 3
    }}>
      <NavLink to={url}>
        <Menu>
          {children}
        </Menu>
      </NavLink>
      <NavLink to={url} style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            display: 'flex',
            justifyContent: "center",
            alignItems: "center",
            fontSize: 22,
            color: '#000',
            p: 2
          }}>
          <strong>{text}</strong>
        </Typography>
      </NavLink>
    </Box>
  )
}
const Main = ({ role }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        marginTop: '17%'

      }}>
      <Icon url="/" text="main" children={
        <HomeIcon
          sx={{
            display: 'flex',
            width: '80px',
            height: '80px',
            justifyContent: "center",
            alignItems: "center",
            opacity: '50%',
            ':hover': {
              color: '#fff',
              opacity: '100%'
            },
          }} />
      } />
      {
        role === 'admin' ?
          <Box
            sx={{
              display: 'flex'
            }}>
            <Icon url="/register" text="사원 관리" children={
              <AssignmentIndIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
            <Icon url="/register2" text="사원 수정" children={
              <AssignmentIndIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
          </Box>
          :
          <Box
            sx={{
              display: 'flex'
            }}>
            <Icon url="/product" text="품목 관리" children={
              <WarehouseIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
            <Icon url="/business" text="거래처 관리" children={
              <StoreIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
            <Icon url="/" text="입고 관리" children={
              <InputIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
            <Icon url="/" text="출고 관리" children={
              <OutputIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
            <Icon url="/" text="일일 현황" children={
              <CalendarTodayIcon
                sx={{
                  display: 'flex',
                  width: '80px',
                  height: '80px',
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: '50%',
                  ':hover': {
                    color: '#fff',
                    opacity: '100%'
                  },
                }} />
            } />
          </Box>
      }
    </Box>
  );
}

export default Main;