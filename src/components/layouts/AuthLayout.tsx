import { useEffect } from "react";
import { Outlet, redirect } from "react-router-dom";
import { AUTH_ROUTES } from "../../constants/routesConstants";

export function AuthLayout() {
  useEffect(() => {
    redirect(AUTH_ROUTES.LOGIN);
  }, []);

  return (
    <main className="w-full h-screen flex items-center justify-center bg-login-gradient text-gray-50">
      <div className="max-w-[480px] w-full bg-slate-900/60 border rounded-lg border-slate-800 p-8 flex items-center justify-center flex-col">
        <Outlet />
      </div>
    </main>
  );
}
