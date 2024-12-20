import { Header, Footer } from "../components";
import { router } from "../router";

class Profile {
  constructor(userName, email, bio) {
    this.userName = userName;
    this.email = email;
    this.bio = bio;
  }

  getProfile() {
    return {
      userName: localStorage.getItem("userName") || "",
      email: localStorage.getItem("email") || "",
      bio: localStorage.getItem("bio") || "",
    };
  }

  updateProfile(userName, email, bio) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("email", email);
    localStorage.setItem("bio", bio);
  }
}

export const profile = new Profile();

export const ProfilePage = () => {
  return `
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${Header()}
          <nav class="bg-white shadow-md p-2 sticky top-14">
            <ul class="flex justify-around">
            <li><a href="/" class="text-gray-600">홈</a></li>
            <li><a href="/profile" class="text-gray-600">프로필</a></li>
            <li><a href="/login" class="text-gray-600" id="logout">로그아웃</a></li>
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

          ${Footer()}
        </div>
      </div>
    </div>
  `;
};

// 이벤트 리스너 등록 함수
export const attachProfileFormListeners = () => {
  const form = document.getElementById("profileForm");
  if (!form) {
    console.error("Profile form not found!");
    return;
  }

  // 추가: username, email, bio 필드가 존재하는지 확인
  const usernameField = form.username;
  const emailField = form.email;
  const bioField = form.bio;

  if (!usernameField || !emailField || !bioField) {
    console.error("One or more input fields are missing!");
    return;
  }

  const { userName, email, bio } = profile.getProfile();
  usernameField.value = userName;
  emailField.value = email;
  bioField.value = bio;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userName = usernameField.value.trim();
    const email = emailField.value.trim();
    const bio = bioField.value.trim();

    if (!userName || !email || !bio) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    profile.updateProfile(userName, email, bio);
    alert("프로필이 성공적으로 업데이트되었습니다.");
    router.navigateTo("/");
  });
};
