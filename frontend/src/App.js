import React, { useState, useEffect } from "react";
import "./assets/scss/index.scss";
import Login from "./components/user/Login";
import Route from "./main/Route";
import { Box } from "@mui/material";
import jwt_decode from "jwt-decode";

const App = () => {
  const [userInfo, setUserInfo] = useState({ user: "", name: "", profile: "" }); // 기존에 user State랑 info(name, profile)을 합쳐서 state로 만들었어여
  useEffect(() => {
    decoder();
  }, []);

  const decoder = () => {
    const token = localStorage.getItem("token");
    const _name = localStorage.getItem("name");
    const _profile = localStorage.getItem("profile");

    token &&
      setUserInfo({ user: jwt_decode(token), name: _name, profile: _profile });
    //"Bearer "붙어 있어도 jwt_decode 잘 돌아감
  };

  const handleLogin = (token, refresh, data) => {
    console.log(`이름: ${data.name}, 프로필 ${data.profile}`); // 백에서 넘어오는 유저 이름, 프로필 경로 확인
    localStorage.setItem("token", "Bearer " + token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("profile", data.profile);
    localStorage.setItem("refresh", refresh);

    setUserInfo({
      user: jwt_decode(token),
      name: data.name,
      profile: data.profile,
    });
    console.log(jwt_decode(token));
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      {!localStorage.getItem("refresh") ? (
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            lineHeight: "50%",
            height: "100%",
            marginTop: "240px",
          }}
        >
          {/* <Logo /> */}
          <Login handleLogin={handleLogin} />
        </Box>
      ) : (
        <Route
          role={userInfo.user.jwt}
          info={userInfo}
          setUserInfo={setUserInfo}
        />
      )}
    </Box>
  );
};

export default App;
