import { Box } from "@mui/material";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import Error404 from "../components/error/Error404";
import SiteLayout from "../components/layout/SiteLayout";
import Product from "../components/Product/Product";
import Business from "../components/Business/Business";
import User from "../components/user/User";
import UserMain from "./UserMain";
import Receive from "../components/Receive/Receive";
import Release from "../components/_Release/Release";
import ProductModal from "../components/Receive/ProductModal";
import Test from "../components/Modal/scroll2";
import Inquiry from "../components/Inquiry/Inquiry";
import MyPage from "../components/user/MyPage";
const AdminRoute = ({ role, info, setUserInfo }) => {
  console.log(info);
  const layout = (children, page) => (
    <SiteLayout role={role} page={page} info={info}>
      {children}
    </SiteLayout>
  );
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Router>
        <Routes>
          {role === "admin" ? (
            <>
              <Route path="/" element={layout(<User />, "/register2")} />
            </>
          ) : role === "user" ? (
            <>
              <Route path="/" element={layout(<UserMain info={info} />)} />
              <Route
                path="/product"
                element={layout(<Product />, "/product")}
              />
              <Route
                path="/business"
                element={layout(<Business />, "/business")}
              />
              <Route
                path="/receive"
                element={layout(<Receive />, "/receive")}
              />
              <Route
                path="/release"
                element={layout(<Release />, "/release")}
              />
              <Route
                path="/productmodal"
                element={layout(<ProductModal />, "/productmodal")}
              />
              <Route
                path="/testscroll"
                element={layout(<Test />, "/testscroll")}
              />
              <Route
                path="/inquiry"
                element={layout(<Inquiry />, "/inquiry")}
              />
              <Route
                path="/mypage"
                element={layout(
                  <MyPage info={info} setUserInfo={setUserInfo} />,
                  "/mypage"
                )}
              />
            </>
          ) : undefined}
        </Routes>
      </Router>
    </Box>
  );
};

export default AdminRoute;
