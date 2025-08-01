import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  const token = localStorage.getItem("token")
  let user = localStorage.getItem("user")
  if(user){
    user = JSON.parse(user)
  }
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }
  
  return (
    <div className="hidden md:block w-full z-40 space-y-4 sticky top-0">
      <div
        className="bg-gradient-to-b from-white/95 via-gray-50/95 to-white/95
                   dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
                   shadow-[0_2px_20px_-2px_rgba(0,0,0,0.15)]
                   backdrop-blur-md
                   border border-[rgba(200,200,200,0.8)] dark:border-[rgba(70,70,70,0.7)]
                   rounded-[28px] p-3"
      >
        <div className="flex items-center justify-center mb-2">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Split Your Expenses with ease right here.
          </h2>
        </div>

        <nav className="space-y-0.5 flex justify-end gap-4 items-center px-4">
          
          {!token ? (<>
          <Link to="/login">
            <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20 shadow-[0_0_10px_-3px_rgba(147,51,234,0.15)] dark:shadow-[0_0_10px_-3px_rgba(147,51,234,0.2)]">
              Login
            </span>
          </Link>
          <Link to="/signup">
            <span className="rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-purple-400/5 via-purple-500/5 to-purple-500/5 text-purple-600 dark:text-purple-400 ring-1 ring-purple-500/20 dark:ring-purple-400/20 shadow-[0_0_10px_-3px_rgba(147,51,234,0.15)] dark:shadow-[0_0_10px_-3px_rgba(147,51,234,0.2)]">
              Signup
            </span>
          </Link>
          </>) : (
          <button onClick={handleLogout}>
            <span className="cursor-pointer rounded-lg inline-flex items-center px-2 py-0.5 text-[12px] tracking-wide font-medium uppercase bg-gradient-to-r from-rose-400/5 via-rose-500/5 to-rose-500/5 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20 dark:ring-rose-400/20 shadow-[0_0_10px_-3px_rgba(199,25,25,0.15)] dark:shadow-[0_0_10px_-3px_rgba(199,25,25,0.2)]">
              Logout
            </span>
          </button>)}
          <ModeToggle/>
        </nav>
      </div>
    </div>
  );
}
