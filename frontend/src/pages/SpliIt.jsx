import React, { useState } from 'react'
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card'
import { useNavigate } from 'react-router-dom'

function SpliIt() {
  const [openForm, setOpenForm] = useState(false)
  const [spaceName, setSpaceName] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem("token")

  const handleForm = () => {
    setOpenForm(true)
  }

  const handleMySpaces = () => {
    navigate("/my-spaces")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (spaceName.trim()) {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ name: spaceName }),
        });
        const data = await res.json();

        if(res.ok){
          setOpenForm(false)
          setSpaceName('')
          navigate(`/space/${data.space._id}`)
        }else{
          alert(data.message || "Something went wrong")
        }

      } catch (error) {
        console.log(error)
        alert("Something went wrong " + error.message)
      }
    }
  }

  return (
    <div className={`mt-30 min-h-screen ${openForm ? 'overflow-hidden' : ''}`}>
      <div className={`${openForm ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
        <h1 className='text-3xl font-bold text-center py-3'>Welcome to SplitIt</h1>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              Split expenses with friends
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              See who owes whom and how much
            </CardItem>
            <CardItem
              translateZ="100"
              rotateX={20}
              rotateZ={-10}
              className="w-full mt-4"
            >
              <img
                src="/splitcard.png"
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem
                translateZ={20}
                translateY={20}
                as="button"
                type="button"
                className="cursor-pointer px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={handleForm}
              >
                Create Space
              </CardItem>
              <CardItem
                translateZ={20}
                translateY={20}
                as="button"
                type="button"
                className="cursor-pointer px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                onClick={handleMySpaces}
              >
                My spaces
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>

      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm"
            onClick={() => setOpenForm(false)}
          ></div>
          <div className="relative bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Space</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  value={spaceName}
                  onChange={(e) => setSpaceName(e.target.value)}
                  placeholder="Enter Space Name" 
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-zinc-100 dark:bg-zinc-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setOpenForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                >
                  Create Space
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpliIt