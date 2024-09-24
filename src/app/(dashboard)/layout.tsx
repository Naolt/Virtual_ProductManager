import Header from "./_components/Layout/Header";
import SideBar from "./_components/Layout/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main content area */}
      <div className="flex flex-col w-full">
        <Header />
        <main className="p-6 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}
