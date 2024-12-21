import { MainPage, LoginPage, ProfilePage, ErrorPage } from "../pages";

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = window.location.pathname;
    this.init();
  }

  init() {
    window.addEventListener("popstate", () => {
      this.currentRoute = window.location.pathname;
      this.render();
    });
    this.render();
  }

  navigate(path) {
    this.currentRoute = path;
    history.pushState(null, "", path);
    this.render();
  }

  render() {
    const route = this.routes[this.currentRoute] || this.routes["/NotFound"];
    const { template, init } = route();
    document.body.innerHTML = template;
    if (typeof init === "function") init();
  }
}

const routes = {
  "/": MainPage,
  "/login": LoginPage,
  "/profile": ProfilePage,
  "/NotFound": ErrorPage,
};

export const router = new Router(routes);
