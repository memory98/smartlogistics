export const refresh = async () => {
  try {
    const response = await fetch("/api/sign/refresh", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
        refresh: localStorage.getItem("refresh"),
      },
    });
    if (!response.ok) {
      return false;
    }
    const json = await response.json();
    if (json.result !== "success") {
      return false;
    }

    const jwtToken = response.headers
      .get("Authorization")
      .replace("Bearer ", "");

    const refreshToken = response.headers.get("refresh");

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("refresh", refreshToken);

    console.log(jwtToken);
    console.log(refreshToken);

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
