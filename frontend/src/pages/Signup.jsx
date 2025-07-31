import React from 'react'
import { Button } from '../components/ui/button'

function Signup() {
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
              <label htmlFor="email" className="block text-xl font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input type="email" id="email" className="mt-1 block w-[500px] px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block text-xl font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input type="password" id="password" className="mt-1 block w-[500px] px-4 py-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
            <div>
              <Button type="submit" className="w-full rounded-md cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Signup
              </Button>
            </div>
          </form>
      </div>
    </div>
    </>
  )
}

export default Signup