import React from "react";

type ReactChildProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: ReactChildProps) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
