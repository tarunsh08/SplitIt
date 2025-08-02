import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { LoaderThree } from "../components/ui/loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Space() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
  
        const data = await res.json();
        if(res.ok) {
          setSpace(data.space);
        } else {
          setError(data.error || "Something went wrong");
          toast.error(data.error || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch Space");
        toast.error("Failed to fetch Space");
      } finally {
        setLoading(false);
      }
    }
    fetchSpace();
  }, [id, token]);  

  const inviteUser = async (e) => {
    e.preventDefault();
    if(!email.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/${id}/add-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        // credentials: "include",
        body: JSON.stringify({ email }),
      })

      const data = await res.json();
      if(res.ok){
        toast.success("User added successfully");
        setEmail("");
        setSpace((prev) => ({
          ...prev, 
          members: [...prev.members, data.member],
        }));
      }else{
        toast.error(data.error || "Failed to add member");
      }
    } catch (err) {
      toast.error("Server error");
    }
  }

  if(loading){
    return <LoaderThree/>
  }

  if(error){
    return <div className="text-red-500 p-4">Error: {error}</div>
  }

  return (
    <div className='min-h-screen p-8'>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <h1 className="text-3xl font-bold mb-4">Space: {space.name}</h1>

      <section className='mb-8'>
        <h2 className='text-xl font-semibold mb-2'>Members:</h2>
        <ul className='list-disc list-inside space-y-1'>
          {space.members.map((member) => (
            <li key={member._id}>{member.name} ({member.email})</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-2'>Invite Member</h2>

        <form onSubmit={inviteUser} className='space-x-2'>
          <input type="email"
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='p-2 rounded bg-zinc-800 border border-zinc-600 text-white'
          />
          <button type='submit' className='bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white'>
            Invite friends
          </button>
        </form>
      </section>
    </div>
  )
}

export default Space