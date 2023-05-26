import { errorHandlingMiddleware } from "./errorHandlingMiddleware";
import { refresh } from "./refresh";
// customFetch 함수는 fetch를 확장한 함수로, 에러 발생 시 errorHandlingMiddleware 함수를 호출합니다.
export const customFetch = async (url, obj) => {
  const controller = new AbortController();
  const signal = controller.signal;

  function cancelPreviousRequest() {
    controller.abort();
  }

  return await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    signal,
    ...obj,
  })
    .then(async (response) => {
      if (response.status === 403) {
        alert("부여되지 않은 권한 접근입니다.");
        return null;
      }
      if (response.status === 401) {
        //리프레시 토큰 주고 다시 토큰받아오기
        if (!(await refresh())) {
          throw new Error(
            "로그인 시간이 만료되었습니다. 다시 로그인하여 주세요."
          );
        }
        //다시 요청 받아오기
        console.log("재귀 customFetch");
        return await customFetch(url, obj);
      }
      //403 401외의 에러 잡아서 표기
      if (!response.ok) {
        console.log("response.status:" + response.status);
        console.log(response);
        throw new Error(`${response.statusText} 다시 로그인하여 주세요.`);
      }
      return response.json();
    })
    .then((json) => {
      // if (json.result !== "success") {
      //   alert(json.message);
      // }
      return json;
    })
    .catch((error) => {
      // 에러 처리
      if (error.name === "AbortError" || error.name === "TypeError") {
        cancelPreviousRequest();
      } else {
        errorHandlingMiddleware(error); // 공통 에러 처리 로직 호출
      }
      throw error; // 다시 에러를 던져서 이후의 catch 블록에서도 에러 처리 가능하도록 함
    });
};
