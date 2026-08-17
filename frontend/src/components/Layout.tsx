import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white">
          <div className="p-6">
            <h1 className="text-2xl font-bold">
              Gestion Colis
            </h1>
          </div>

          <nav className="px-4">
            <p className="mb-2 px-3 text-xs font-semibold uppercase text-slate-400">
              Menu
            </p>
          </nav>
        </aside>

        {/* Contenu */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;