import { router } from "./router";

// 네비게이션 상태 업데이트 함수
const updateNavigation = () => {
  const userId = localStorage.getItem("userId");
  const profileMenu = document.querySelector('a[href="/profile"]');
  const loginLogoutButton = document.querySelector("#logout");

  if (userId) {
    // 로그인 상태
    if (profileMenu) profileMenu.style.display = "block";
    if (loginLogoutButton) {
      loginLogoutButton.setAttribute("href", "#logout");
      loginLogoutButton.textContent = "로그아웃";
    }
  } else {
    // 비로그인 상태

    if (loginLogoutButton) {
      loginLogoutButton.setAttribute("href", "/login");
      loginLogoutButton.textContent = "로그인";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  router.handleRoute(window.location.pathname);
  updateNavigation();

  document.body.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const path = e.target.getAttribute("href");

      if (path === "#logout") {
        localStorage.removeItem("userId");
        router.navigateTo("/");
        updateNavigation();
      } else {
        router.navigateTo(path);
        updateNavigation();
      }
    }

    // 로그인 로직
    if (e.target.id === "logIn") {
      e.preventDefault();
      const userId = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (userId && password) {
        localStorage.setItem("userId", userId);
        router.navigateTo("/profile");
        updateNavigation();
      } else {
        alert("아이디 또는 비밀번호를 입력해주세요.");
      }
    }

    //로그아웃 로직
    if (e.target.id === "logout") {
      e.preventDefault();
      localStorage.removeItem("userId");
      router.navigateTo("/");
      updateNavigation();
    }
  });
});
