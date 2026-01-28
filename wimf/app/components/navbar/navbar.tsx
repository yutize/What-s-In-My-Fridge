export function Navbar() {
  return (
    <div className="navbar bg-white shadow-sm">
      <div className="flex-1">
        <a href="/dashboard" className="btn btn-ghost text-xl text-gray-700">What's In My Fridge</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-gray-700">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a href="/nutrition">Nutrition</a></li>
          <li><a href="/ingredients">Ingredient Management</a></li>
          <li><a>Meal Plans</a></li>

          <li>
            <details>
              <summary>Manage Profile</summary>
              <ul className="bg-white rounded-t-none p-2">
                <li><a>Settings</a></li>
                <li><a href="/logout">Logout</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}