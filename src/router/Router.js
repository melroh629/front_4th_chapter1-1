import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../pages";
import { attachProfileFormListeners } from "../pages/ProfilePage";

export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", () => this.handlePopState());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    history.pushState(null, "", path);
    this.handleRoute(path);
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    const appRoot = document.getElementById("root");

    if (handler && appRoot) {
      appRoot.innerHTML = handler();

      // 각 페이지 렌더링 후 필요한 작업 수행
      if (path === "/profile") {
        attachProfileFormListeners(); // 프로필 페이지에 이벤트 리스너 추가
      }
    } else if (appRoot) {
      appRoot.innerHTML = ErrorPage(); // 404 페이지 처리
    }
  }
  beforeNavigate(path) {
    const userId = localStorage.getItem("userId");

    // 비로그인 상태에서 /profile 접근 시 로그인 페이지로 리다이렉트
    if (path === "/profile" && !userId) {
      this.navigateTo("/login");
      return false; // 현재 경로를 중단
    }
    return true;
  }
}

export const router = new Router();

const routes = [
  { path: "/", handler: MainPage },
  { path: "/profile", handler: ProfilePage },
  { path: "/login", handler: LoginPage },
];

routes.forEach((route) => {
  router.addRoute(route.path, route.handler);
});
