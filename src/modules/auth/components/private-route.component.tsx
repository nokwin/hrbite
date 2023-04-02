import { FC, PropsWithChildren } from 'react';
import { useAuthStore } from '../store';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';

interface PrivateRouteProps {}

export const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = observer(
  ({ children }) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  }
);
