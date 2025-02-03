import Sidebar from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 px-12">{children}</main>
    </div>
  );
}

export default Layout;
