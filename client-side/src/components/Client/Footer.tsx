import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-blue-950 to-slate-900 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Inkspire</h1>
          <p className="text-sm text-gray-400">
            Discover and explore stories that move the world. Designed for book
            lovers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Explore</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:text-blue-400">
                Books
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Account</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/auth" className="hover:text-blue-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
            </li>
            <li>
              <Link to="/forgot-password" className="hover:text-blue-400">
                Forgot Password
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Connect</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-400">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
