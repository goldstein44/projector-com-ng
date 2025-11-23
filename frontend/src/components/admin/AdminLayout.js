// frontend/components/admin/AdminLayout.js
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();

  const menu = [
    { name: "Dashboard", path: "/admin" },
    { name: "Sale Projectors", path: "/admin/products" },
    { name: "Rental Projectors", path: "/admin/rentals" },
    { name: "Logout", path: "/", danger: true }
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-900 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">ProjectorLekki Admin</h1>
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
            Logout (goldstein)
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">
        <aside className="w-64 bg-white rounded-lg shadow p-4">
          {menu.map(item => (
            <button
              key={item.path}
              onClick={() => item.danger ? handleLogout() : router.push(item.path)}
              className={`w-full text-left p-3 rounded mb-2 transition ${
                router.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              } ${item.danger ? "text-red-600 hover:bg-red-50" : ""}`}
            >
              {item.name}
            </button>
          ))}
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow p-8">
          {children}
        </main>
      </div>
    </div>
  );
}