import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  
  if (user) {
    user = JSON.parse(user);
  }
  
  const navigate = useNavigate();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavLinks = () => (
    <>
      {!token ? (
        <>
          <Link 
            to="/login" 
            className="block py-2 px-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20 shadow-[0_0_10px_-3px_rgba(147,51,234,0.15)] dark:shadow-[0_0_10px_-3px_rgba(147,51,234,0.2)]">
              Login
            </span>
          </Link>
          <Link 
            to="/signup" 
            className="block py-2 px-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20 shadow-[0_0_10px_-3px_rgba(147,51,234,0.15)] dark:shadow-[0_0_10px_-3px_rgba(147,51,234,0.2)]">
              Signup
            </span>
          </Link>
        </>
      ) : (
        <button 
          onClick={() => {
            handleLogout();
            setIsMobileMenuOpen(false);
          }}
          className="w-full text-left py-2 px-4 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors duration-200"
        >
          <span className="cursor-pointer rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-rose-400/5 via-rose-500/5 to-rose-500/5 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20 dark:ring-rose-400/20 shadow-[0_0_10px_-3px_rgba(199,25,25,0.15)] dark:shadow-[0_0_10px_-3px_rgba(199,25,25,0.2)]">
            Logout
          </span>
        </button>
      )}
      <div className="px-4 py-2 sticky">
        <ModeToggle />
      </div>
    </>
  );

  return (
    <div className={`w-full z-40 space-y-4 fixed top-0 transition-all duration-300 ${hasMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="bg-gradient-to-b from-zinc-200 via-gray-50/95 to-zinc-400
                   dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                   shadow-[0_2px_20px_-2px_rgba(0,0,0,0.15)]
                   backdrop-blur-md
                   border border-[rgba(200,200,200,0.8)] dark:border-[rgba(70,70,70,0.7)]
                   rounded-[28px] p-3"
      >
        <div className="flex items-center justify-between mb-2 px-2">
          <Link
            to="/"
            className="group relative transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              SplitIt
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-purple-600/0 via-purple-600 to-pink-600/0 dark:from-purple-400/0 dark:via-purple-400 dark:to-pink-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </h2>
          </Link>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className={`w-5 flex flex-col gap-1 transition-all duration-300 ${isMobileMenuOpen ? 'transform rotate-180' : ''}`}>
              <span className={`h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-5'}`}></span>
              <span className={`h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
              <span className={`h-0.5 bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-3'}`}></span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-between items-center px-4">
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <NavLinks />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="flex flex-col items-start space-y-2 py-2 px-2">
            <NavLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
