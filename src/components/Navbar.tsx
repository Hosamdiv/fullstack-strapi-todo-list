import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const onLogout = () => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      location.replace(pathname);
    }, 500);
  };
  return (
    <nav className="max-w-lg mx-auto mt-7 mb-20 bg-indigo-600 px-3 py-5 rounded-md">
      <ul className="flex items-center justify-between">
        <li className="hover:bg-indigo-500 text-white rounded-md p-2 duration-200 font-semibold text-lg">
          <NavLink to="/">Home</NavLink>
        </li>
        {userData ? (
          <div className="flex items-center  text-white space-x-4">
            <li className="duration-200 hover:bg-indigo-500 rounded-md p-1 text-lg">
              <NavLink to="/todos">todos</NavLink>
            </li>
            <li className="duration-200 hover:bg-indigo-500 rounded-md p-1 text-lg">
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <button
              className="hover:bg-indigo-500 text-white p-2 rounded-md cursor-pointer"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="flex items-center space-x-3">
            <li className="hover:bg-indigo-500 rounded-md text-white p-1 duration-200 font-semibold text-lg">
              <NavLink to="/register">Register</NavLink>
            </li>
            <li className="hover:bg-indigo-500 rounded-md text-white p-1 duration-200 font-semibold text-lg">
              <NavLink to="/login">Login</NavLink>
            </li>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
