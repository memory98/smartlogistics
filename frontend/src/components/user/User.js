import React, { useState, useRef } from "react";
import UserList from "./UserList";
import UserSerchBar from "./UserSerchBar";
import UserUpdate from "./UserUpdate";
import { Box, Grid } from "@mui/material";
import { customFetch } from "../custom/customFetch";
import Swal from "sweetalert2";

const User = () => {
  const submitError = useRef("");
  const [loading, setLoading] = useState(true);
  const rowColor = useRef();
  const searchKw = useRef({ ukeywd: "", uphone: "" });
  const [searchTextFiled, setSearchTextFiled] = useState({
    ukeywd: "",
    uphone: "",
  });

  const style = document.createElement("style");
  style.innerHTML = `
    .custom-swal-container {
      z-index: 9999; /* 원하는 z-index 값으로 설정 */
    }
  `;
  document.head.appendChild(style);

  const changeSearchKwdEvent = () => {
    searchKw.current = searchTextFiled;
    setSearchTextFiled({ ukeywd: "", uphone: "" });
    startIndex.current = 0;
    isNotDataMore.current = false;
    setUsers([]);
  };

  const changeHandler = (e) => {
    let { value, name } = e.target;
    if (name === "uphone") {
      if (value.length > 13) {
        return;
      }
      value = autoHyphen(value);
      console.log(value);
    }
    setSearchTextFiled((prev) => ({ ...prev, [name]: value }));
  };

  const autoHyphen = (target) => {
    return target
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
  };

  const [users, setUsers] = useState([]);
  const [Detail, setDetail] = useState([]);

  const [item, setItem] = useState({ id: "", name: "", phone: "" });

  const isNotDataMore = useRef(false);
  const [isFetching, setIsFetching] = useState(false);
  const startIndex = useRef(0);

  const searchKeyword = async () => {
    if (isFetching) {
      return;
    }
    const limit = 15;

    console.log("startIndex:" + startIndex.current);
    console.log(searchKw.current.uphone + " : " + searchKw.current.ukeywd);
    if (isNotDataMore.current) {
      return;
    }
    setLoading(true);
    var url = `/api/user/list?offset=${startIndex.current}&limit=${limit}`;
    if (searchKw.current.ukeywd !== "" || searchKw.current.uphone !== "") {
      url = `/api/user/list?uk=${searchKw.current.ukeywd}&up=${searchKw.current.uphone}&offset=${startIndex.current}&limit=${limit}`;
    }
    setIsFetching(true);
    await customFetch(url, { method: "get" })
      .then((json) => {
        if (json.data.length === limit) {
          startIndex.current += limit;
        } else {
          isNotDataMore.current = true;
        }
        setUsers((prev) => [...prev, ...json.data]);
        setIsFetching(false);
      })
      .finally(() => setLoading(false));
    setDetail([]);
    setItem({ id: "", name: "", phone: "", code: "" });
  };

  const itemAddHandler = async (obj) => {
    console.log(obj);
    const json = await customFetch(`/api/user`, {
      headers: {
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "post",
      body: obj,
    });
    console.log(json.data);
    if (json.result === "fail") {
      Swal.fire({
        title: "",
        text: "이미 등록되어 있는 아이디 입니다.",
        icon: "warning",
        customClass: {
          container: "custom-swal-container",
        },
      });
      return false;
    }
    let object = {};
    const { id, name, phone } = json.data;
    object = { id, name, phone };
    setUsers([...users, object]);
    Swal.fire({
      title: "",
      text: `${name} 유저 회원가입 성공`,
      icon: "success",
    });
    return true;
  };

  const itemUpdateHandler = async (item, target) => {
    console.log("update");
    await customFetch(`/api/user/update?uc=${target}`, {
      method: "post",
      body: JSON.stringify(item),
    }).then(() =>
      setUsers((prev) => prev.map((user) => (user.id === target ? item : user)))
    );
    Swal.fire({
      title: "",
      text: `${target} 유저 정보 변경 완료`,
      icon: "success",
    });
  };

  const userDetail = async (id) => {
    rowColor.current = id;
    setDetail(...users.filter((user) => user.id === id));
  };

  const deleteItemHandler = async (data) => {
    console.log(" ===== delete ===== ");
    console.log(data);
    await customFetch(`/api/user/delete`, {
      method: "post",
      body: JSON.stringify(data),
    }).then((json) => {
      if (json.data === true) {
        setUsers(users.filter((user) => data.includes(user.id) === false));
        setDetail([]);
        // setItem({ id: "", name: "", phone: "", code: "" });
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={2} style={{ marginLeft: "0px" }}>
        <UserSerchBar
          callback={searchKeyword}
          searchTextFiled={searchTextFiled}
          changeHandler={changeHandler}
          changeSearchKwdEvent={changeSearchKwdEvent}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <UserList
            users={users}
            userDetail={userDetail}
            itemAddHandler={itemAddHandler}
            deleteItemHandler={deleteItemHandler}
            setItem={setItem}
            setDetail={setDetail}
            searchKeyword={searchKeyword}
            loading={loading}
            rowColor={rowColor}
            submitError={submitError}
          />
          <UserUpdate
            userDetail={Detail}
            itemUpdateHandler={itemUpdateHandler}
            item={item}
            setItem={setItem}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default User;
