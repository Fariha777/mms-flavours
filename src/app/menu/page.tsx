import Navbar from "@/components/Navbar";

async function getMenu() {
  const res = await fetch("http://localhost:3000/api/menu", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }
  return res.json();
}

export default async function MenuPage() {
  const menuItems = await getMenu();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Menu</h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item: any) => (
              <div key={item._id} className="bg-white overflow-hidden shadow rounded-lg">
                {item.image && <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />}
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
