import { Header, Footer } from "../components/index.js";
import { userStore } from "../store/userStore.js";

export const ProfilePage = () => {
  const header = Header();
  const footer = Footer();
  const template = `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
        ${header.template}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    사용자 이름
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                  >
                    자기소개
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>
          ${footer.template}
        </div>
      </div>
    </div>
  `;

  const init = () => {
    header.init();
    footer.init();

    const form = document.getElementById("profile-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const bioTextarea = document.getElementById("bio");

    // 초기값 설정
    const user = userStore.getUser();
    if (user) {
      usernameInput.value = user.username || "";
      emailInput.value = user.email || "";
      bioTextarea.value = user.bio || "";
    }

    // 폼 제출 처리
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const updatedUser = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioTextarea.value.trim(),
      };

      // 유효성 검사
      if (!updatedUser.username || !updatedUser.email) {
        alert("사용자 이름과 이메일은 필수 항목입니다.");
        return;
      }

      // 사용자 정보 업데이트
      userStore.saveUserToStorage(updatedUser);
      alert("프로필이 성공적으로 업데이트되었습니다!");
    });
  };

  return { template, init };
};
