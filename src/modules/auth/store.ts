import { makeAutoObservable, autorun } from 'mobx';
import { FetchStatus } from '../../common/types';

interface AuthenticateParams {
  email: string;
  password: string;
}

class AuthStore {
  isLoggedIn = false;
  logoutStatus: FetchStatus = 'NOT_STARTED';

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

  logout() {
    this.logoutStatus = 'LOADING';

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isLoggedIn = false;
        this.logoutStatus = 'NOT_STARTED';

        resolve(true);
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
