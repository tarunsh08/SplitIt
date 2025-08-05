import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {LoaderThree} from "../components/ui/loader"

function AllSpaces() {

    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token")
    
    const fetchSpaces = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/my-spaces`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            const data = await res.json();

            if(res.ok){
                setSpaces(data.spaces);
            }else{
                alert(data.error || "Failed to fetch spaces");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSpaces();
    }, [])

    if(loading){
        return <div className='flex items-center justify-center p-8 mt-20 md:mt-30'><LoaderThree/></div>
    }


  return (
    <div className='min-h-screen p-8 mt-20 md:mt-30'>
    <h1 className='text-2xl text-center font-semibold p-4'>Your Spaces</h1>

    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {spaces.length > 0 ? (
        spaces.map((space) => (
            <div 
            key={space._id} 
            onClick={() => navigate(`/space/${space._id}`)}
            className='bg-zinc-900 p-5 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300'
            >
                <h2 className='text-xl font-semibold'>{space.name}</h2>
                <p className='text-sm text-gray-400 mt-1'>{space.members.length} members</p>
                <p className='text-sm text-gray-400 mt-1'>Created: {new Date(space.createdAt).toLocaleDateString()}</p>

            </div>
        ))
      ): (<p>No spaces found</p>)}
    </div>
    </div>
  )
}

export default AllSpaces