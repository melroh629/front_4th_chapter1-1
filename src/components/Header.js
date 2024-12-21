import { router } from "../router/router.js";
import { userStore } from "../store/userStore.js";

const navItems = [
  { label: "홈", path: "/" },
  { label: "프로필", path: "/profile" },
  { label: "로그아웃", path: "/", action: "logout", authRequired: true },
  { label: "로그인", path: "/login", guestOnly: true },
];

export const Header = () => {
  const getNavItems = () => {
    const isLoggedIn = userStore.isLogin();
    return navItems.filter((item) => {
      if (item.authRequired && !isLoggedIn) return false;
      if (item.guestOnly && isLoggedIn) return false;
      return true;
    });
  };

  const template = `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        ${getNavItems()
          .map(
            (item) => `
            <li>
              <a href="${item.path}" 
                 ${item.action ? `data-action="${item.action}"` : ""}
                 class="text-gray-600"
              >${item.label}</a>
            </li>
          `,
          )
          .join("")}
      </ul>
    </nav>
  `;

  const init = () => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          const path = e.target.getAttribute("href");
          const action = e.target.dataset.action;

          if (action === "logout") {
            userStore.logout();
            router.navigate("/");
            return;
          }

          if (path === "/profile" && !userStore.isLogin()) {
            alert("로그인이 필요한 서비스입니다.");
            router.navigate("/login");
            return;
          }

          router.navigate(path);
        }
      });
    }
  };

  return { template, init };
};
