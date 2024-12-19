import { router } from "./router";
import { MainPage } from "./pages";

document.body.innerHTML = `
  ${MainPage()}
  
`;

document.querySelector("nav").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    router.navigateTo(e.target.pathname);
  }
});

// 로그인 로직
document.body.addEventListener("click", (e) => {
  // 로그인 로직
  if (e.target.id === "logIn") {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;
    if (userId && password) {
      localStorage.setItem("userId", JSON.stringify({ userId }));
      router.navigateTo("/profile");
    } else {
      alert("아이디 또는 비밀번호를 입력해주세요");
    }
  }
  // 로그아웃 로직
  if (e.target.id === "logOut") {
    e.preventDefault();
    localStorage.removeItem("userId");
    router.navigateTo("/login");
  }
});
