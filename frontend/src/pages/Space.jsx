import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { LoaderThree } from "../components/ui/loader"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SpaceChat from '../components/SpaceChat';

function Space() {
  const { id } = useParams();
  const [space, setSpace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    paidBy: "",
    splitBetween: []
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
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
    if (!email.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/${id}/add-member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json();
      if (res.ok) {
        toast.success("User added successfully");
        setEmail("");
        setSpace((prev) => ({
          ...prev,
          members: [...prev.members, data.member],
        }));
      } else {
        toast.error(data.error || "Failed to add member");
      }
    } catch (err) {
      toast.error("Server error");
    }
  }

  const toggleMemberSplit = (memberId) => {
    setExpense(prev => {
      if (prev.splitBetween.includes(memberId)) {
        return {
          ...prev,
          splitBetween: prev.splitBetween.filter(id => id !== memberId)
        };
      } else {
        return {
          ...prev,
          splitBetween: [...prev.splitBetween, memberId]
        };
      }
    });
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (expense.splitBetween.length === 0) {
      toast.error("Please select at least one member to split with");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/space/${id}/expense`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          spaceId: id,
          description: expense.description,
          amount: parseFloat(expense.amount),
          paidBy: expense.paidBy,
          splitBetween: expense.splitBetween
        })
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Expense added!");
        setSpace((prev) => ({
          ...prev,
          expenses: [...(prev.expenses || []), data.expense],
          balances: data.updatedBalances || prev.balances
        }));
        setExpense({
          description: "",
          amount: "",
          paidBy: "",
          splitBetween: []
        });
      } else {
        toast.error(data.error || "Error adding expense");
      }
    } catch (error) {
      toast.error("Server error");
    }
  }

  const calculateSplitAmount = (amount, splitCount) => {
    return (parseFloat(amount) / splitCount).toFixed(2);
  };

  if (loading) {
    return <div className='flex items-center justify-center p-8 mt-20 md:mt-30'><LoaderThree/></div>
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className='min-h-screen p-4 md:p-8 mt-20 md:mt-30 bg-white dark:bg-zinc-900 transition-colors duration-200'>
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

      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-800 dark:text-white">
          Space: {space.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Members Section */}
            <section className='mb-8 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow'>
              <h2 className='text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200'>
                Members
              </h2>
              <ul className='space-y-2'>
                {space.members.map((member) => (
                  <li 
                    key={member._id} 
                    className="p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                  >
                    <span className="font-medium text-zinc-800 dark:text-zinc-100">
                      {member.name}
                    </span>
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400">
                      {member.email}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Invite Form */}
              <div className="mt-6">
                <h3 className='text-lg font-medium mb-2 text-zinc-700 dark:text-zinc-200'>
                  Invite New Member
                </h3>
                <form onSubmit={inviteUser} className='flex gap-2'>
                  <input 
                    type="email"
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='flex-1 p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                  />
                  <button 
                    type='submit' 
                    className='bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white transition-colors'
                  >
                    Invite
                  </button>
                </form>
              </div>
            </section>

            {user && <section className='mb-3 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow'>
              <SpaceChat spaceId={id} user={user} />
            </section>}

            {/* Balances Section */}
            {space.balances && Object.keys(space.balances).length > 0 && (
              <section className='mb-8 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow'>
                <h2 className='text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200'>
                  Balances
                </h2>
                <div className="space-y-3">
                  {Object.entries(space.balances).map(([userId, amount]) => {
                    const member = space.members.find(m => m._id === userId);
                    if (!member) return null;
                    
                    return (
                      <div 
                        key={userId} 
                        className={`p-3 rounded ${
                          parseFloat(amount) > 0 
                            ? 'bg-green-100 dark:bg-green-900' 
                            : parseFloat(amount) < 0 
                              ? 'bg-red-100 dark:bg-red-900' 
                              : 'bg-zinc-200 dark:bg-zinc-700'
                        }`}
                      >
                        <span className="font-medium text-zinc-800 dark:text-zinc-100">
                          {member.name}
                        </span>
                        <span className={`block text-sm ${
                          parseFloat(amount) > 0 
                            ? 'text-green-800 dark:text-green-200' 
                            : parseFloat(amount) < 0 
                              ? 'text-red-800 dark:text-red-200' 
                              : 'text-zinc-500 dark:text-zinc-400'
                        }`}>
                          {parseFloat(amount) > 0 
                            ? `Gets back ₹${Math.abs(amount).toFixed(2)}`
                            : parseFloat(amount) < 0 
                              ? `Owes ₹${Math.abs(amount).toFixed(2)}`
                              : 'All settled up'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Add Expense Section */}
            <section className='mb-8 p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow'>
              <h2 className='text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200'>
                Add Expense
              </h2>
              <form onSubmit={addExpense} className='space-y-4'>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder='What was this expense for?'
                    value={expense.description}
                    onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                    className='w-full p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder='0.00'
                    min="0.01"
                    step="0.01"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                    className='w-full p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Paid by
                  </label>
                  <select
                    value={expense.paidBy}
                    onChange={(e) => setExpense({ ...expense, paidBy: e.target.value })}
                    className="w-full p-2 rounded bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 text-zinc-800 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">-- Select Payer --</option>
                    {space.members.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Split between
                  </label>
                  <div className="space-y-2">
                    {space.members.map((member) => (
                      <div key={member._id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`member-${member._id}`}
                          checked={expense.splitBetween.includes(member._id)}
                          onChange={() => toggleMemberSplit(member._id)}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-zinc-300 dark:border-zinc-600 rounded"
                        />
                        <label 
                          htmlFor={`member-${member._id}`} 
                          className="ml-2 text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          {member.name}
                          {expense.amount && expense.splitBetween.includes(member._id) && expense.splitBetween.length > 0 && (
                            <span className="ml-2 text-xs text-zinc-500 dark:text-zinc-400">
                              (₹{calculateSplitAmount(expense.amount, expense.splitBetween.length)} each)
                            </span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type='submit' 
                  className='w-full bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded text-white transition-colors'
                >
                  Add Expense
                </button>
              </form>
            </section>

            {/* Expenses List Section */}
            <section className='p-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow'>
              <h2 className='text-xl font-semibold mb-4 text-zinc-700 dark:text-zinc-200'>
                Expense History
              </h2>
              <div className='space-y-3'>
                {space.expenses?.length > 0 ? (
                  space.expenses.map((exp) => {
                    const payer = space.members.find(m => m._id === exp.paidBy);
                    return (
                      <div 
                        key={exp._id}
                        className='p-3 rounded bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-sm'
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-zinc-800 dark:text-white">
                              {exp.description}
                            </h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Paid by {payer?.name || "Unknown"} • ₹{parseFloat(exp.amount).toFixed(2)}
                            </p>
                          </div>
                          <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full">
                            {exp.splitBetween.length} people
                          </span>
                        </div>
                        {exp.splitDetails && (
                          <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-600">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                              Split details:
                            </p>
                            <ul className="text-xs space-y-1">
                              {exp.splitDetails.map((detail, i) => {
                                const member = space.members.find(m => m._id === detail.userId);
                                return (
                                  <li key={i} className="flex justify-between">
                                    <span>{member?.name || "Unknown"}</span>
                                    <span>₹{parseFloat(detail.amount).toFixed(2)}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-4 text-center text-zinc-500 dark:text-zinc-400">
                    No expenses yet. Add your first expense!
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Space