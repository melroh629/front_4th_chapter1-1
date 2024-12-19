import { MainPage, ProfilePage, LoginPage, ErrorPage } from "../pages";

export class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("popstate", () => this.handlePopState());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    if (this.beforeNavigate(path)) {
      history.pushState(null, "", path);
      this.handleRoute(path);
    }
  }

  handlePopState() {
    this.handleRoute(window.location.pathname);
  }

  handleRoute(path) {
    const handler = this.routes[path];
    const appRoot = document.getElementById("root");

    if (handler && appRoot) {
      appRoot.innerHTML = handler();

      // 경로별로 이벤트 등록 처리
      if (path === "/profile") {
        import("../pages/ProfilePage.js").then((module) => {
          module.attachProfileFormListeners();
        });
      }
    } else {
      appRoot.innerHTML = ErrorPage();
    }
  }

  beforeNavigate(path) {
    const userId = localStorage.getItem("userId");
    if (path === "/profile" && !userId) {
      alert("로그인이 필요합니다.");
      this.navigateTo("/login");
      return false;
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
