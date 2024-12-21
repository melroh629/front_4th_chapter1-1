class UserStore {
  constructor() {
    this.user = this.getUserFromStorage();
    this.isLoggedIn = !!this.user;
  }

  getUserFromStorage() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  saveUserToStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
    this.user = user;
    this.isLoggedIn = true;
  }

  clearUserFromStorage() {
    localStorage.removeItem("user");
    this.user = null;
    this.isLoggedIn = false;
  }

  login(user) {
    this.saveUserToStorage(user);
  }

  logout() {
    this.clearUserFromStorage();
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }
}

export const userStore = new UserStore();
