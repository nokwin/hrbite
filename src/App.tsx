import { FC } from 'react';
import { Layout } from './common/components/layout.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './modules/auth/pages/login.page';
import { PrivateRoute } from './modules/auth/components/private-route.component';
import { ListEmployees } from './modules/employees/pages/list-employees.page';

interface AppProps {}

export const App: FC<AppProps> = ({}) => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ListEmployees />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
