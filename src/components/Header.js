import { router } from "../router/router.js";

export const Header = () => {
  const template = `
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="text-blue-600">홈</a></li>
        <li><a href="/profile" class="text-gray-600">프로필</a></li>
        <li><a href="/login" class="text-gray-600">로그아웃</a></li>
      </ul>
    </nav>
  `;

  const init = () => {
    // Header 영역 내에서만 이벤트 위임 처리
    const nav = document.querySelector("nav");
    if (nav) {
      nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
          e.preventDefault();
          const path = e.target.getAttribute("href");
          router.navigate(path);
        }
      });
    }
  };

  return { template, init };
};
