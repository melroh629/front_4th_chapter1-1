import { router } from "./router";

document.addEventListener("DOMContentLoaded", () => {
  // 초기 경로 렌더링
  router.handleRoute(window.location.pathname);

  // 네비게이션 클릭 이벤트 처리
  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const path = e.target.pathname;
      router.navigateTo(path);
    }

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
});
