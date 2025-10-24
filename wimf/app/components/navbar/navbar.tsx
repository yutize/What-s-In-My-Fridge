export function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a href="/dashboard" className="btn btn-ghost text-xl">What's In My Fridge</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/recipes">Recipes</a></li>
          <li><a>Nutrition</a></li>
          <li><a>Meal Plans</a></li>

          <li>
            <details>
              <summary>Manage Profile</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
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