import { FC, PropsWithChildren } from 'react';
import { Button, Navbar } from 'flowbite-react';
import { useAuthStore } from '../../modules/auth/store';

interface LayoutProps {}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children }) => {
  const authStore = useAuthStore();

  return (
    <>
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HRBite
          </span>
        </Navbar.Brand>
        {authStore.isLoggedIn && (
          <div className="flex md:order-2">
            <Button>Log out</Button>
          </div>
        )}
      </Navbar>
      <main>{children}</main>
    </>
  );
};
