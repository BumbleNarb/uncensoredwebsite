import { Outlet } from 'react-router';
import { CartSidebar } from './CartSidebar';

export function Layout() {
  return (
    <>
      <Outlet />
      <CartSidebar />
    </>
  );
}
