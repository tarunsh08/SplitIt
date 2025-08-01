import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log('Sending request to:', `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`)
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/splitit")
      } else {
        alert(data.message || "Something went wrong")
      }
    } catch (err) {
      console.log(err)
      alert("Something went wrong" + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex min-h-screen bg-gradient-to-b from-white/95 via-gray-50/95 to-white/95 dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90 backdrop-blur-md">
        <div className="flex flex-col items-center justify-center flex-1 h-full">
          <div className="w-full max-w-md">
            <div className="flex items-center justify-center m-2">
              <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                SignUp to SplitIt
              </h2>
            </div>
          </div>
          <form className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-xl font-medium text-zinc-700 dark:text-zinc-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-[500px] px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-[500px] px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-[500px] px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full rounded-md cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSignup}
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup