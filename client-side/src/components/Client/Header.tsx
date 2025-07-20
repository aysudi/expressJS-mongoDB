import { NavLink } from "react-router-dom";
import "../../index.css";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-3xl font-bold">Inkspire</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Books
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `bg-blue-600 px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition ${
                isActive ? "active-btn" : ""
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/auth/register"
            className={({ isActive }) =>
              `bg-blue-600 px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition ${
                isActive ? "active-btn" : ""
              }`
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
