import { HashRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Sketch from "./pages/Sketch";
import Work from "./pages/Work";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col overflow-x-hidden w-screen bg-white">
      <nav className="bg-white text-black p-4 flex justify-between items-center fixed w-screen top-0 z-50 shadow">
        {/* Artist name on the left */}
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Artist Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Links on the right */}
        <div className="flex gap-8 px-3 py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-green-400" : "text-black"} hover:text-green-400`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/sketch"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-green-400" : "text-black"} hover:text-green-400`
            }
          >
            Works
          </NavLink>
          <NavLink
            to="/work"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-green-400" : "text-black"} hover:text-green-400`
            }
          >
            Resume
          </NavLink>
        </div>
      </nav>



        {/* Main content — full screen width */}
        <main className="pt-16 flex-1 w-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sketch" element={<Sketch />} />
            <Route path="/work" element={<Work />} />
          </Routes>
        </main>

        {/* Footer full width */}
        <footer className="bg-gray-100 text-center p-6 border-t w-screen">
          <p className="text-gray-700 mb-3">© {new Date().getFullYear()} Matthew Wu</p>
          <div className="flex justify-center gap-6 text-gray-600">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">LinkedIn</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}
