import { makeAutoObservable, autorun } from 'mobx';

interface AuthenticateParams {
  email: string;
  password: string;
}

class AuthStore {
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);

    const isLoggedInCached = localStorage.getItem('isLoggedIn');

    if (isLoggedInCached) {
      this.isLoggedIn = isLoggedInCached === 'true';
    }
  }

  authenticate({ email, password }: AuthenticateParams) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'hr@test.com' && password === 'test') {
          this.isLoggedIn = true;
          resolve(true);
        } else {
          reject(false);
        }
      }, 500);
    });
  }
}

const authStoreInstance = new AuthStore();

autorun(() => {
  localStorage.setItem(
    'isLoggedIn',
    JSON.stringify(authStoreInstance.isLoggedIn)
  );
});

export const useAuthStore = () => {
  return authStoreInstance;
};
