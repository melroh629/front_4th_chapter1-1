import { router } from "../router";

class Profile {
  // 사용자 이름, 이메일, 자기소개
  constructor(userName, email, bio) {
    this.userName = userName;
    this.email = email;
    this.bio = bio;
  }
  // 로컬 스토리지에 저장된 프로필 데이터를 가져오는 메서드
  getProfile() {
    return {
      userName: localStorage.getItem("userName"),
      email: localStorage.getItem("email"),
      bio: localStorage.getItem("bio"),
    };
  }
  // 프로필 데이터를 업데이트하는 메서드
  updateProfile(userName, email, bio) {
    localStorage.setItem("userName", JSON.stringify({ userName }));
    localStorage.setItem("email", JSON.stringify({ email }));
    localStorage.setItem("bio", JSON.stringify({ bio }));
  }
}

const profile = new Profile();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const userName = form.username.value;
      const email = form.email.value;
      const bio = form.bio.value;
      profile.updateProfile(userName, email, bio);
      router.navigateTo("/");
    });
  }
});

export const ProfilePage = () => {
  return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>

          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
              <li><a href="/" class="text-gray-600">홈</a></li>
              <li><a href="/profile" class="text-blue-600">프로필</a></li>
              <li><a href="/login" class="text-gray-600">로그아웃</a></li>
            </ul>
          </nav>

          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profileForm">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    // value="홍길동"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    // value="hong@example.com"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  ></textarea
                  >
                </div>
                <button
                  id="profileUpdate"
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>

          <footer class="bg-gray-200 p-4 text-center">
            <p>&copy; 2024 항해플러스. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </div>
  `;
};
