import { MainPage, ProfilePage, LoginPage } from "../pages";

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
    if (handler) {
      document.body.innerHTML = handler();
    } else {
      document.body.innerHTML = "error페이지로 교체";
    }
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
