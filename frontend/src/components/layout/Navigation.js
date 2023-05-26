import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import StoreIcon from "@mui/icons-material/Store";
import InputIcon from "@mui/icons-material/Input";
import OutputIcon from "@mui/icons-material/Output";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ListIcon from "@mui/icons-material/List";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SearchIcon from "@mui/icons-material/Search";
import { customFetch } from "../custom/customFetch";
const drawerWidth = 180;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const NavBox = styled(Box, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  })
);

const Navigation = ({ role, page }) => {
  console.log("page : " + page);

  const logoutHandler = async () => {
    await customFetch("/api/sign/logout", { method: "get" }).then(() => {
      localStorage.clear();
      window.location.href = "/";
    });
  };

  // const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const MenuItem = ({ children, text, url }) => {
    return (
      <ListItem
        key={text}
        disablePadding
        sx={{
          display: "block",
          ":hover": {
            border: open ? "1px solid #fff" : "2px solid #444579",
            borderRadius: open ? 0 : "20px",
          },
        }}
      >
        <ListItemButton
          component={NavLink}
          to={url}
          sx={{
            minHeight: 48,
            color: "#B8D7FA",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              ml: -0.5,
              mr: open ? 3 : "auto",
              color: page === url ? "#A2E9F9" : "#fff",
            }}
          >
            {children}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: page === url ? "#A2E9F9" : "#fff",
                  textDecoration: "none",
                  textAlign: "left",
                }}
              >
                <strong>{text}</strong>
              </Typography>
            }
            sx={{
              opacity: open ? 1 : 0
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <NavBox
      sx={{
        position: "absolute",
        backgroundColor: "#253659",
        height: "100%",
      }}
      variant="permanent"
      open={open}
    >
      <List
        sx={{
          height: "95%",
        }}
      >
        <ListItemButton
          component={Button}
          sx={{
            ml: 0.5,
            width: open ? "164px" : "48px",
            marginTop: "100px",
          }}
          onClick={(e) => (open ? setOpen(false) : setOpen(true))}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <ListIcon />
          </ListItemIcon>
        </ListItemButton>
        {role === "admin" ? (
          <Box
            sx={{
              width: open ? "0px" : "48px",
              marginTop: "20px",
              marginLeft: 1,
              backgroundColor: "#444579",
              borderRadius: "20px",
            }}
          >
            <MenuItem text={"사원 관리"} url={"/"}>
              <PersonIcon />
            </MenuItem>
          </Box>
        ) : (
          <Box
            sx={{
              width: open ? "0px" : "48px",
              marginTop: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
              marginLeft: 1,
              backgroundColor: "#444579",
              borderRadius: "20px",
            }}
          >
            <MenuItem text={"품목 관리"} url={"/product"}>
              <WarehouseIcon />
            </MenuItem>
            <MenuItem text={"거래처 관리"} url={"/business"}>
              <StoreIcon />
            </MenuItem>
            <MenuItem text={"입고 관리"} url={"/receive"}>
              <InputIcon />
            </MenuItem>
            <MenuItem text={"출고 관리"} url={"/release"}>
              <OutputIcon />
            </MenuItem>
            <MenuItem text={"일일 현황"} url={"/inquiry"}>
              <CalendarTodayIcon />
            </MenuItem>
          </Box>
        )}
        <ListItemButton
          component={Button}
          sx={{
            position: "absolute",
            ml: 0.5,
            width: open ? "164px" : "48px",
            justifyContent: "left",
            bottom: 0,
          }}
          onClick={logoutHandler}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <PowerSettingsNewIcon
              sx={{
                color: "red",
              }}
            />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </NavBox>
  );
};

export default Navigation;
